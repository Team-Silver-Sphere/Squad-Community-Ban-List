import { AffectedSteamID, Ban, BanList, Organization } from 'database/models';
import { battlemetricsAPIHostname } from 'core/config/battlemetrics-api';
import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';
import banReasonClassifier from 'core/utils/ban-reason-classifier';

export default class BanImporter {
  constructor() {
    this.flush();

    this.pageSize = 100;
  }

  flush() {
    this.currentBanList = null;
    this.officialBanList = false;

    this.importedBanUIDs = [];

    this.nextPage = null;
  }

  async hasWork() {
    return (
      (await BanList.countDocuments({
        type: 'battlemetrics',
        importStatus: 'queued'
      })) > 0
    );
  }

  async doWork() {
    let error = false;

    if (!this.currentBanList) await this.selectBanList();

    try {
      await this.importPage();
    } catch (err) {
      console.log(err);
      this.log(
        `Error thrown when importing ban list (${this.currentBanList._id}).`
      );
      error = true;
    }

    if (!this.nextPage) await this.deselectBanList(error);
  }

  log(msg) {
    console.log(`BanImporter: ${msg}`);
  }

  async selectBanList() {
    this.currentBanList = await BanList.findOne({
      type: 'battlemetrics',
      importStatus: 'queued'
    }).sort({
      lastImported: 1
    });

    this.official = (
      await Organization.findOne({ _id: this.currentBanList.organization })
    ).official;

    this.importedBanUIDs = [];

    const queryParams = new URLSearchParams({
      'filter[banList]': this.currentBanList.source,
      'page[size]': this.pageSize
    });

    this.nextPage = `${battlemetricsAPIHostname}/bans?${queryParams}`;

    this.log(`Selected ban list (${this.currentBanList._id}) to import.`);
  }

  async importPage() {
    // query battlemetrics API for the next page
    const response = await battlemetricsAPIGateway('get', this.nextPage);

    for (const ban of response.data) {
      // get the steamID of the player banned.
      let steamID;
      // loop through identifiers to get steamID.
      for (const identifier of ban.attributes.identifiers) {
        if (identifier.type !== 'steamID') continue;

        // some show steam url instead of usual format so handle that case.
        if (identifier.identifier)
          steamID = identifier.identifier.replace(
            'https://steamcommunity.com/profiles/',
            ''
          );
        else if (identifier.metadata)
          steamID = identifier.metadata.profile.steamid;
        else continue;

        break;
      }

      // sometimes there is no steamID in the response, so do not add the ban to the DB.
      if (steamID == null) continue;

      // record that the ban exists so we can find deleted bans.
      this.importedBanUIDs.push(ban.attributes.uid);

      // information to be saved about the ban
      const banRecord = {
        steamID: steamID,

        created: ban.attributes.timestamp,
        expires: ban.attributes.expires,
        expired: !(
          ban.attributes.expires === null ||
          new Date(ban.attributes.expires) > Date.now()
        ),

        reason: this.official
          ? [ban.attributes.reason]
          : banReasonClassifier(ban.attributes.reason + ban.attributes.note),

        uid: ban.attributes.uid,

        banList: this.currentBanList._id
      };

      // check whether the ban has been updated in anyway.
      const updatedBan = (await Ban.countDocuments(banRecord)) === 0;

      // update the ban information in the database.
      await Ban.findOneAndUpdate(
        {
          uid: ban.attributes.uid,
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
        await this.queueAffectedSteamID(steamID);
        this.log(`Updated ban (${ban.attributes.uid}) on player (${steamID}).`);
      }
    }

    // update the url of the next page to import
    this.nextPage = response.links.next;
  }

  async queueAffectedSteamID(steamID) {
    await AffectedSteamID.findOneAndUpdate(
      { steamID },
      { steamID },
      { upsert: true, setDefaultsOnInsert: true }
    );
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
}
