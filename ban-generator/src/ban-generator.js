import sleep from 'core/utils/sleep';
import {
  AffectedSteamID,
  Ban,
  ExportBan,
  ExportBanList
} from 'database/models';

export default class BanGenerator {
  constructor() {
    this.sleepPeriod = 10 * 1000;
  }

  async run() {
    while (true) {
      if (await this.generatorHasWork()) {
        await this.generatorDoWork();
      } else if (await this.updaterHasWork()) {
        await this.updaterDoWork();
      } else {
        console.log('No tasks found. Sleeping...');
        await sleep(this.sleepPeriod);
      }
    }
  }

  async generatorHasWork() {
    return (
      (await ExportBanList.countDocuments({ generatorStatus: 'queued' })) > 0
    );
  }

  async generatorDoWork() {
    this.exportBanList = await ExportBanList.findOne({
      generatorStatus: 'queued'
    });
    console.log(
      `Generating export ban list for with ID: ${this.exportBanList._id}`
    );

    try {
      this.exportBanListConfig = JSON.parse(this.exportBanList.config);

      // get a list of all players that we hold information on.
      const steamIDs = await Ban.distinct('steamID');

      // for each player check whether they should be banned and add them to the banned players object.
      for (const steamID of steamIDs) {
        await this.processPlayer(steamID);
      }

      await ExportBanList.findOneAndUpdate(
        { _id: this.exportBanList._id },
        { generatorStatus: 'completed' }
      );
    } catch (err) {
      console.log(
        `Failed to generate export ban list (${this.exportBanList._id}).`
      );

      await ExportBanList.findOneAndUpdate(
        { _id: this.exportBanList._id },
        { generatorStatus: 'errored' }
      );
    }
  }

  async updaterHasWork() {
    return (await AffectedSteamID.countDocuments({ status: 'queued' })) > 0;
  }

  async updaterDoWork() {
    // get the steam id that needs to be updated.
    const steamID = (await AffectedSteamID.findOne()).steamID;
    console.log(`Updating export ban lists for SteamID: ${steamID}`);

    try {
      // get a list of all export ban lists that we need to update.
      const exportBanLists = await ExportBanList.find({
        generatorStatus: 'completed'
      });

      // for each export ban list update it
      for (const exportBanList of exportBanLists) {
        this.exportBanList = exportBanList;
        this.exportBanListConfig = JSON.parse(this.exportBanList.config);
        console.log(
          `Updating export ban list with ID: ${this.exportBanList._id}`
        );
        await this.processPlayer(steamID);
      }

      await AffectedSteamID.deleteOne({ steamID });
    } catch (err) {
      console.log(
        `Failed to update export ban lists for affected steamID (${steamID}).`
      );

      await AffectedSteamID.findOneAndUpdate(
        { steamID },
        { status: 'errored' }
      );
    }
  }

  async processPlayer(steamID) {
    const shouldBeBanned = await this.shouldPlayerBeBanned(steamID);

    const exportBan = await ExportBan.findOne({
      steamID,
      exportBanList: this.exportBanList._id
    });

    if (shouldBeBanned && exportBan === null) {
      await ExportBan.create({
        steamID,
        exportBanList: this.exportBanList._id,
        battlemetricsStatus:
          this.exportBanList.battlemetricsStatus === 'disabled'
            ? 'disabled'
            : 'queued'
      });
    }

    if (!shouldBeBanned && exportBan !== null) {
      if (exportBan.battlemetricsStatus === 'completed') {
        await ExportBan.updateOne(
          {
            steamID,
            exportBanList: this.exportBanList._id
          },
          { battlemetricsStatus: 'deleted' }
        );
      } else {
        await ExportBan.deleteMany({
          steamID,
          exportBanList: this.exportBanList._id
        });
      }
    }
  }

  async shouldPlayerBeBanned(steamID) {
    const activeBans = await Ban.find({
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

    const expiredBans = await Ban.find({
      steamID,
      expires: { $lt: Date.now() }
    });

    let count = 0;

    for (const ban of activeBans) {
      count +=
        `${ban.banList}-active` in this.exportBanListConfig
          ? this.exportBanListConfig[`${ban.banList}-active`]
          : 3;
      if (count >= this.exportBanListConfig.threshold) return true;
    }

    for (const ban of expiredBans) {
      count +=
        `${ban.banList}-expired` in this.exportBanListConfig
          ? this.exportBanListConfig[`${ban.banList}-expired`]
          : 1;
      if (count >= this.exportBanListConfig.threshold) return true;
    }

    // the threshold was not reached so return false.
    return false;
  }
}
