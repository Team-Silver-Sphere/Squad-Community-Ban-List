import fs from 'fs';
import path from 'path';
import sleep from 'core/utils/sleep';
import {
  AffectedSteamID,
  BattleMetricsBan,
  ExportBanList
} from 'database/models';

export default class BanExporter {
  constructor() {
    this.sleepPeriod = 10 * 1000;
  }

  async run() {
    while (true) {
      if (await this.isTasksForGenerator()) {
        console.log('Task found for generator.');
        await this.processGeneratorTask();
      } else if (await this.isTasksForUpdater()) {
        console.log('Task found for updater.');
        await this.processUpdaterTask();
      } else {
        console.log('No tasks found. Sleeping...');
        await sleep(this.sleepPeriod);
      }
    }
  }

  async isTasksForGenerator() {
    const count = await ExportBanList.countDocuments({ generated: false });
    return count > 0;
  }

  async isTasksForUpdater() {
    const count = await AffectedSteamID.countDocuments();
    return count > 0;
  }

  async processGeneratorTask() {
    // get the ban list that needs to be generated.
    this.unpackExportBanList(
      await ExportBanList.findOne({ generated: false }),
      true
    );
    console.log(`Generating export ban list for with ID: ${this.listObjectID}`);

    // get a list of all players that we hold information on.
    const steamIDs = await BattleMetricsBan.distinct('steamID');

    // for each player check whether they should be banned and add them to the banned players object.
    for (const steamID of steamIDs) {
      await this.processPlayer(steamID);
    }

    await this.packExportBanList(true);
  }

  async processUpdaterTask() {
    // get the steam id that needs to be updated.
    const steamID = (await AffectedSteamID.findOne()).steamID;
    console.log(`Updating export ban lists for SteamID: ${steamID}`);

    // get a list of all export ban lists that we need to update.
    const exportBanLists = await ExportBanList.find({ generated: true });

    // for each export ban list update it
    for (const exportBanList of exportBanLists) {
      this.unpackExportBanList(exportBanList);
      console.log(`Updating export ban list with ID: ${this.listObjectID}`);
      await this.processPlayer(steamID);
      await this.packExportBanList();
    }

    await AffectedSteamID.deleteOne({ steamID });
  }

  unpackExportBanList(exportBanList, noRead = false) {
    this.listObjectID = exportBanList._id;
    this.listConfig = JSON.parse(exportBanList.config);

    this.listBannedPlayers = {};

    if (!noRead)
      fs.readFileSync(this.getExportBanListPath(), 'utf8')
        .split('\n')
        .forEach(bannedPlayer => {
          this.listBannedPlayers[bannedPlayer.replace(':0', '')] = true;
        });
  }

  async packExportBanList(generated = false) {
    // write ban list file
    fs.writeFileSync(
      this.getExportBanListPath(),
      Object.keys(this.listBannedPlayers)
        .map(player => `${player}:0`)
        .join('\n')
    );

    // set generated flag to true
    if (generated)
      await ExportBanList.findOneAndUpdate(
        { _id: this.listObjectID },
        { generated: true }
      );

    // flush
    this.listObjectID = null;
    this.listConfig = null;
    this.listBannedPlayers = {};
  }

  getExportBanListPath() {
    return path.resolve(`./export-ban-lists/${this.listObjectID}.txt`);
  }

  async processPlayer(steamID) {
    const isBanned = await this.shouldPlayerBeBanned(steamID);
    if (isBanned) this.listBannedPlayers[steamID] = true;
    else delete this.listBannedPlayers[steamID];
  }

  async shouldPlayerBeBanned(steamID) {
    const activeBans = await BattleMetricsBan.find({
      $or: [
        {
          steamID,
          expires: null
        },
        {
          steamID,
          expires: { $gt: Date.now() }
        }
      ]
    });

    const expiredBans = await BattleMetricsBan.find({
      steamID,
      expires: { $lt: Date.now() }
    });

    let count = 0;

    for (const ban of activeBans) {
      count +=
        `${ban.banList}-active` in this.listConfig
          ? this.listConfig[`${ban.banList}-active`]
          : 3;
      if (count >= this.listConfig.threshold) return true;
    }

    for (const ban of expiredBans) {
      count +=
        `${ban.banList}-expired` in this.listConfig
          ? this.listConfig[`${ban.banList}-expired`]
          : 1;
      if (count >= this.listConfig.threshold) return true;
    }

    // the threshold was not reached so return false.
    return false;
  }
}
