import { battlemetricsAPIHostname } from 'core/config/battlemetrics-api';
import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';
import {
  AffectedSteamID,
  BattleMetricsBan,
  BattleMetricsBanList
} from 'database/models';

export default class BanImporter {
  constructor() {
    this.currentBanListID = null;
    this.currentBanListObjectID = null;

    this.importedBanUIDs = [];

    this.nextPage = null;
    this.pageSize = 100;
  }

  async run() {
    console.log('Setting up ban importer...');

    while (true) {
      console.log('Selecting ban list to import...');
      await this.initImport();

      while (this.nextPage) {
        console.log('Importing ban page...');
        await this.importPage();
      }

      console.log('Finished importing bans...');
      await this.finishImport();
    }
  }

  async initImport() {
    const banList = await BattleMetricsBanList.findOne().sort({
      lastImported: 1
    });

    this.currentBanListID = banList.id;
    this.currentBanListObjectID = banList._id;

    this.importedBanUIDs = [];

    const queryParams = new URLSearchParams({
      'filter[expired]': false,
      'filter[banList]': this.currentBanListID,
      'page[size]': this.pageSize
    });

    this.nextPage = `${battlemetricsAPIHostname}/bans?${queryParams}`;
  }

  async importPage() {
    console.log(this.nextPage);

    // query battlemetrics API for the next page
    const response = await battlemetricsAPIGateway(this.nextPage);

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
        else steamID = identifier.metadata.profile.steamid;
        break;
      }

      // sometimes there is no steamID in the response, so do not add the ban to the DB.
      if (steamID == null) continue;

      // record that the ban exists so we can find deleted bans.
      this.importedBanUIDs.push(ban.attributes.uid);

      // information to be saved about the ban
      const banRecord = {
        uid: ban.attributes.uid,
        timestamp: ban.attributes.timestamp,
        reason: ban.attributes.reason,
        note: ban.attributes.note,
        expires: ban.attributes.expires,

        steamID: steamID,

        banList: this.currentBanListObjectID
      };

      // check whether the ban has been updated in anyway.
      const updatedBan =
        (await BattleMetricsBan.countDocuments(banRecord)) === 0;

      // update the ban information in the database.
      await BattleMetricsBan.findOneAndUpdate(
        { uid: ban.attributes.uid },
        banRecord,
        { upsert: true, setDefaultsOnInsert: true }
      );
      console.log(`Saved ban to database: ${ban.attributes.uid}`);

      // the ban has been updated so process the steamID
      if (updatedBan) await this.queueAffectedSteamID(steamID);
    }

    // update the url of the next page to import
    this.nextPage = response.links.next;
  }

  async finishImport() {
    // find the bans that were deleted.
    (
      await BattleMetricsBan.distinct('steamID', {
        banList: this.currentBanListObjectID,
        uid: { $nin: this.importedBanUIDs }
      })
    ).forEach(steamID => this.queueAffectedSteamID(steamID));

    // delete the bans that were deleted.
    await BattleMetricsBan.deleteMany({
      banList: this.currentBanListObjectID,
      uid: { $nin: this.importedBanUIDs }
    });

    // update the ban list with the new import date
    await BattleMetricsBanList.updateOne(
      {
        _id: this.currentBanListObjectID
      },
      {
        lastImported: Date.now()
      }
    );
  }

  async queueAffectedSteamID(steamID) {
    await AffectedSteamID.findOneAndUpdate(
      { steamID },
      { steamID },
      { upsert: true, setDefaultsOnInsert: true }
    );
    console.log(`Queued affected Steam ID: ${steamID}`);
  }
}
