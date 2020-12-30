import Sequelize from 'sequelize';

import sequelize, { Op } from '../sequelize.js';
import { Ban, SteamUser } from './index.js';

import { Logger } from '../../utils/index.js';

import {
  fetchBattlemetricsBanList,
  fetchRemoteBanList,
  fetchTTBanList
} from '../../ban-list-fetchers/index.js';

const { DataTypes } = Sequelize;

class BanList extends Sequelize.Model {
  async importBans() {
    // Fetch bans.
    Logger.verbose('BanList', 1, `Fetching ban list (ID: ${this.id}, Type: ${this.type})...`);
    const importedBans = await this.getBans();
    Logger.verbose(
      'BanList',
      1,
      `Fetched ${importedBans.length} bans from ban list (ID: ${this.id}, Type: ${this.type}).`
    );

    // Get a list of unique Steam users from the imported bans.
    const uniqueSteamIDsToCreate = [
      ...new Set(importedBans.map((importedBan) => ({ id: importedBan.steamUser })))
    ];

    // Insert the unique Steam users from the imported bans into the DB.
    Logger.verbose(
      'BanList',
      1,
      `Creating ${uniqueSteamIDsToCreate.length} steam users from ban list (ID: ${this.id})...`
    );
    await SteamUser.bulkCreate(uniqueSteamIDsToCreate, { updateOnDuplicate: ['id'] });

    // Save/updated/delete the imported bans in the DB taking note Steam users who's bans have been changed.
    const updatedBannedSteamUsers = [];

    Logger.verbose(
      'BanList',
      1,
      `Saving ${importedBans.length} bans from ban list (ID: ${this.id})...`
    );
    for (const importedBan of importedBans) {
      importedBan.id = `${this.id},${importedBan.id}`;

      try {
        const [ban, created] = await Ban.findOrCreate({
          where: { id: importedBan.id },
          defaults: {
            id: importedBan.id,
            created: importedBan.created || Date.now(),
            expires: importedBan.expires,
            expired: importedBan.expired,
            reason: importedBan.reason,
            rawReason: importedBan.rawReason,
            steamUser: importedBan.steamUser,
            banList: this.id
          }
        });

        if (created) {
          Logger.verbose(
            'BanList',
            1,
            `Found new ban (${importedBan.id}) in ban list (ID: ${this.id}).`
          );

          // If the ban is new then we need to recalculate export ban list information for that user.
          updatedBannedSteamUsers.push(importedBan.steamUser);

          // If the ban is new then the saved information will already be up to date so we can skip the next steps.
          continue;
        }

        let updated = false;

        if (ban.expired !== importedBan.expired) {
          ban.expired = importedBan.expired;
          updated = true;

          // If the expired status for the ban has changed then we need to recalculate export ban list information
          // for that user to handle points changes between active and expired bans.
          updatedBannedSteamUsers.push(importedBan.steamUser);
        }

        if (
          ban.expires !== null &&
          importedBan.expires !== null &&
          ban.expires.getTime() !== importedBan.expires.getTime()
        ) {
          console.log(
            ban.expires.getTime(),
            importedBan.expires.getTime(),
            ban.expires.getTime() !== importedBan.expires.getTime()
          );

          ban.expires = importedBan.expires;
          updated = true;
        }

        if (ban.reason !== importedBan.reason) {
          ban.reason = importedBan.reason;
          updated = true;
        }

        if (ban.rawReason !== importedBan.rawReason) {
          ban.rawReason = importedBan.rawReason;
          updated = true;
        }

        // Save the updated information.
        if (updated) {
          Logger.verbose(
            'BanList',
            1,
            `Found updated ban (${importedBan.id}) in ban list (ID: ${this.id}).`
          );
          await ban.save();
        }
      } catch (err) {
        Logger.verbose('BanList', 1, `Failed to save imported ban (ID: ${importedBan.id}): `, err);
      }
    }

    Logger.verbose(
      'BanList',
      1,
      `Saved ${importedBans.length} bans from ban list (ID: ${this.id}).`
    );

    // Get a list of bans that have been deleted from the imported ban list.
    const deletedBans = await Ban.findAll({
      attributes: ['id', 'steamUser'],
      where: {
        id: { [Op.notIn]: importedBans.map((importedBan) => importedBan.id) },
        banList: this.id
      }
    });

    // If a ban has been deleted then we need to recalculate export ban list information for that user.
    updatedBannedSteamUsers.concat(deletedBans.map((deletedBan) => deletedBan.steamUser));

    // Delete the deleted bans from the DB.
    Logger.verbose('BanList', 1, `Deleting ${deletedBans.length} bans...`);
    await Ban.destroy({
      where: { id: { [Op.in]: deletedBans.map((deletedBan) => deletedBan.id) } }
    });

    // Find the unique Steam IDs that need updating.
    const uniqueSteamIDsToUpdate = [...new Set(updatedBannedSteamUsers)];

    // Queue updated Steam users for update.
    Logger.verbose(
      'BanList',
      1,
      `Queueing ${uniqueSteamIDsToUpdate.length} steam users from ban list (ID: ${this.id}) for update...`
    );
    await SteamUser.update(
      {
        lastRefreshedInfo: null,
        lastRefreshedExport: null,
        lastRefreshedReputationPoints: null,
        lastRefreshedReputationRank: null
      },
      { where: { id: { [Op.in]: uniqueSteamIDsToUpdate } } }
    );
  }

  async getBans() {
    switch (this.type) {
      case 'battlemetrics':
        return fetchBattlemetricsBanList(this.source);
      case 'remote':
        return fetchRemoteBanList(this.source);
      case 'tt':
        return fetchTTBanList(this.source);
      default:
        throw new Error('Ban list type not supported.');
    }
  }
}

BanList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.TEXT
    }
  },
  { sequelize }
);

export default BanList;
