import axios from 'axios';

import { AffectedSteamID, Ban, BanList } from 'database/models';
import banReasonClassifier from 'core/utils/ban-reason-classifier';

export default class BanImporter {
  constructor() {
    this.flush();

    this.importCooldown = 300 * 1000;
  }

  flush() {
    this.currentBanList = null;

    this.importedBanUIDs = [];

    this.nextPage = null;
  }

  async hasWork() {
    return (
      (await BanList.countDocuments({
        type: 'tt',
        importStatus: 'queued',
        lastImported: { $lte: new Date(Date.now() - this.importCooldown) }
      })) > 0
    );
  }

  async doWork() {
    let error = false;

    await this.selectBanList();

    try {
      await this.importBans();
    } catch (err) {
      console.log(err);
      this.log(
        `Error thrown when importing ban list (${this.currentBanList._id}).`
      );
      error = true;
    }

    await this.deselectBanList(error);
  }

  log(msg) {
    console.log(`BanImporter: ${msg}`);
  }

  async selectBanList() {
    this.currentBanList = await BanList.findOne({
      type: 'tt',
      importStatus: 'queued',
      lastImported: { $lte: new Date(Date.now() - this.importCooldown) }
    }).sort({
      lastImported: 1
    });

    this.importedBanUIDs = [];

    this.log(`Selected ban list (${this.currentBanList._id}) to import.`);
  }

  async importBans() {
    const response = await axios.get(this.currentBanList.source);

    for (const ban of response.data) {
      const uid = `${ban.steam_id}-${ban.start_datetime}`;
      // record that the ban exists so we can find deleted bans.
      this.importedBanUIDs.push(uid);

      // information to be saved about the ban
      const banRecord = {
        steamID: ban.steam_id,

        created: ban.start_datetime,
        expires: ban.end_datetime,
        expired: !(
          ban.end_datetime === null || new Date(ban.end_datetime) > Date.now()
        ),

        reason: banReasonClassifier(ban.reason + ban.notes),

        uid: uid,

        banList: this.currentBanList._id
      };

      // check whether the ban has been updated in anyway.
      const updatedBan = (await Ban.countDocuments(banRecord)) === 0;

      // update the ban information in the database.
      await Ban.findOneAndUpdate(
        {
          uid: uid,
          banList: this.currentBanList._id
        },
        banRecord,
        {
          upsert: true,
          setDefaultsOnInsert: true
        }
      );

      // the ban has been updated so process the steamID
      if (updatedBan) {
        await this.queueAffectedSteamID(ban.steam_id);
        this.log(`Updated ban (${uid}) on player (${ban.steam_id}).`);
      }
    }
  }

  async deselectBanList(error = false) {
    // find the bans that were deleted.
    (
      await Ban.distinct('steamID', {
        uid: { $nin: this.importedBanUIDs },
        banList: this.currentBanList._id
      })
    ).forEach(steamID => {
      this.queueAffectedSteamID(steamID);
      this.log(`Deleted ban on player (${steamID}).`);
    });

    // delete the bans that were deleted.
    await Ban.deleteMany({
      uid: { $nin: this.importedBanUIDs },
      banList: this.currentBanList._id
    });

    // update the ban list with the new import date
    await BanList.updateOne(
      { _id: this.currentBanList._id },
      { lastImported: Date.now(), importStatus: error ? 'errored' : 'queued' }
    );

    if (!error)
      this.log(`Finished importing ban list (${this.currentBanList._id}).`);
    this.flush();
  }

  async queueAffectedSteamID(steamID) {
    await AffectedSteamID.create([{ steamID }], {
      upsert: true,
      setDefaultsOnInsert: true
    });
  }
}
