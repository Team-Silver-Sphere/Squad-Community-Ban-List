import async from 'async';

import { Ban, BanList, SteamUser } from 'scbl-lib/db/models';
import { Op } from 'scbl-lib/db/sequelize';
import { Logger } from 'scbl-lib/utils';

import BanFetcher from './ban-fetcher.js';

export default class BanImporter {
  constructor(options) {
    options = {
      saveRawBanWorkers: 2,
      ...options
    };

    this.saveRawBan = this.saveRawBan.bind(this);
    this.saveRawBanQueue = async.queue(this.saveRawBan, options.saveRawBanWorkers);

    this.importedBanListIDs = new Set();
    this.importedBanIDs = [];
  }

  async saveRawBan(rawBan) {
    try {
      this.importedBanListIDs.add(rawBan.banList.id);
      this.importedBanIDs.push(rawBan.id);
      await rawBan.save();
    } catch (err) {
      Logger.verbose(
        'BanImporter',
        1,
        `Failed to save raw ban (ID: ${rawBan.id}) in ban list (ID: ${rawBan.banList.id}): `,
        err
      );
    }
  }

  async importBans() {
    Logger.verbose('BanImporter', 1, 'Fetching ban lists to import...');
    const banLists = await BanList.findAll();
    Logger.verbose('BanImporter', 1, `Fetched ${banLists.length} ban lists to import.`);

    const fetcher = new BanFetcher(this.saveRawBanQueue);

    Logger.verbose('BanImporter', 1, 'Fetching ban lists...');
    for (const banList of banLists) {
      await fetcher.fetchBanList(banList);
    }

    Logger.verbose('BanImporter', 1, 'Waiting for bans to be saved...');
    await this.saveRawBanQueue.drain();

    Logger.verbose('BanImporter', 1, 'Getting deleted bans...');
    const deletedBans = await Ban.findAll({
      attributes: ['steamUser'],
      where: {
        id: { [Op.notIn]: this.importedBanIDs },
        banList: { [Op.in]: [...this.importedBanListIDs] }
      }
    });
    Logger.verbose('BanImporter', 1, `Got ${deletedBans.length} deleted bans`);

    Logger.verbose('BanImporter', 1, 'Queuing Steams for update from deleted bans...');
    await SteamUser.update(
      {
        lastRefreshedInfo: null,
        lastRefreshedExport: null,
        lastRefreshedReputationPoints: null,
        lastRefreshedReputationRank: null
      },
      {
        where: {
          id: {
            [Op.in]: deletedBans.map((deletedBan) => deletedBan.steamUser)
          }
        }
      }
    );

    Logger.verbose('BanImporter', 1, 'Deleting deleted bans...');
    await Ban.destroy({
      where: {
        id: { [Op.notIn]: this.importedBanIDs },
        banList: { [Op.in]: [...this.importedBanListIDs] }
      }
    });
  }
}
