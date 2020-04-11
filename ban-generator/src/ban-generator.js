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

  async updaterHasWork() {
    return (await AffectedSteamID.countDocuments({ status: 'queued' })) > 0;
  }

  async generatorDoWork() {
    console.log('Generating export ban lists...');

    const steamIDs = await Ban.distinct('steamID');
    const bansBySteamIDs = await this.getBansBySteamIDs(steamIDs);
    const exportBanLists = await ExportBanList.find({
      generatorStatus: 'queued'
    });

    for (const exportBanList of exportBanLists) {
      console.log(
        `Generating export ban list (${exportBanList._id}) with ${steamIDs.length} SteamIDs.`
      );
      await this.updateExportBanList(exportBanList, bansBySteamIDs);
      await ExportBanList.updateOne(
        { _id: exportBanList.id },
        { generatorStatus: 'completed' }
      );
      console.log(
        `Finished generating export ban list (${exportBanList._id}) with ${steamIDs.length} SteamIDs.`
      );
    }

    console.log('Finished generating export ban lists.');
  }

  async updaterDoWork() {
    console.log('Updating export ban lists...');

    const affectedSteamIDs = await AffectedSteamID.find({ status: 'queued' });
    const steamIDs = [];
    const affectedSteamIDIDs = [];
    for (const affectedSteamID of affectedSteamIDs) {
      steamIDs.push(affectedSteamID.steamID);
      affectedSteamIDIDs.push(affectedSteamID._id);
    }

    const bansBySteamIDs = await this.getBansBySteamIDs(steamIDs);
    const exportBanLists = await ExportBanList.find();

    for (const exportBanList of exportBanLists) {
      console.log(
        `Updating export ban list (${exportBanList._id}) with ${steamIDs.length} SteamIDs.`
      );
      await this.updateExportBanList(exportBanList, bansBySteamIDs);
      console.log(
        `Finished updating export ban list (${exportBanList._id}) with ${steamIDs.length} SteamIDs.`
      );
    }

    await AffectedSteamID.deleteMany({ _id: { $in: affectedSteamIDIDs } });
    console.log('Finished updating export ban lists.');
  }

  async getBansBySteamIDs(steamIDs) {
    const bans = await Ban.find({ steamID: { $in: steamIDs } });

    const players = {};

    for (const ban of bans) {
      if (!(ban.steamID in players)) players[ban.steamID] = [];

      players[ban.steamID].push(ban);
    }

    return players;
  }

  async updateExportBanList(exportBanList, bansBySteamIDs) {
    const config = JSON.parse(exportBanList.config);

    for (const steamID in bansBySteamIDs) {
      const bans = bansBySteamIDs[steamID];
      let shouldBeBanned = false;
      let count = 0;

      for (const ban of bans) {
        const configProperty = `${ban.banList}-${
          ban.expired ? 'expired' : 'active'
        }`;
        count +=
          configProperty in config
            ? config[configProperty]
            : ban.expired
            ? 1
            : 3;

        if (count < config.threshold) continue;
        shouldBeBanned = true;
        break;
      }

      const exportBan = await ExportBan.findOne({
        steamID,
        exportBanList: exportBanList._id
      });

      if (shouldBeBanned && exportBan === null) {
        await ExportBan.create({
          steamID,
          exportBanList: exportBanList._id,
          battlemetricsStatus:
            exportBanList.battlemetricsStatus === 'disabled'
              ? 'disabled'
              : 'queued'
        });
      }

      if (!shouldBeBanned && exportBan !== null) {
        if (
          ['completed', 'deleted', 'deleted-errored'].includes(
            exportBan.battlemetricsStatus
          )
        ) {
          await ExportBan.updateOne(
            {
              steamID,
              exportBanList: exportBanList._id
            },
            { battlemetricsStatus: 'deleted' }
          );
        } else {
          await ExportBan.deleteMany({
            steamID,
            exportBanList: exportBanList._id
          });
        }
      }
    }
  }
}
