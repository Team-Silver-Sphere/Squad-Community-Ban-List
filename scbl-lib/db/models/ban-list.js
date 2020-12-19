import Sequelize from 'sequelize';

import sequelize, { Op } from '../sequelize.js';
import { Ban, SteamUser } from './index.js';

import {
  fetchBattlemetricsBanList,
  fetchRemoteBanList,
  fetchTTBanList
} from '../../ban-list-fetchers/index.js';

const { DataTypes } = Sequelize;

class BanList extends Sequelize.Model {
  async importBans() {
    // Fetch bans
    console.log(`Fetching ban list (ID: ${this.id}, Type: ${this.type})...`);
    let importedBans;
    switch (this.type) {
      case 'battlemetrics':
        importedBans = await fetchBattlemetricsBanList(this.source);
        break;
      case 'remote':
        importedBans = await fetchRemoteBanList(this.source);
        break;
      case 'tt':
        importedBans = await fetchTTBanList(this.source);
        break;
      default:
        throw new Error('Ban list type not supported.');
    }
    console.log(`Fetched ${importedBans.length} bans from ban list (ID: ${this.id}).`);

    const uniqueSteamIDsToCreate = [
      ...new Set(importedBans.map((importedBan) => ({ id: importedBan.steamUser })))
    ];
    console.log(
      `Creating ${uniqueSteamIDsToCreate.length} steam users from ban list (ID: ${this.id})...`
    );
    await SteamUser.bulkCreate(uniqueSteamIDsToCreate, { updateOnDuplicate: ['id'] });
    console.log(
      `Created ${uniqueSteamIDsToCreate.length} Steam users from ban list (ID: ${this.id}).`
    );

    console.log(`Saving ${importedBans.length} bans from ban list (ID: ${this.id})...`);
    const updatedBannedSteamUsers = [];
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
            steamUser: importedBan.steamUser,
            banList: this.id
          }
        });

        // If the ban was created then it is already up to date. As the ban is new it will affect the Steam user's
        // reputation so we consider them updated.
        if (created) {
          console.log(`Found new ban (${importedBan.id}) in ban list (ID: ${this.id}).`);
          updatedBannedSteamUsers.push(importedBan.steamUser);
          continue;
        }

        let updated = false;

        // Update any changed info in the ban record.
        for (const field of ['expires', 'expired', 'reason']) {
          if (
            ban[field] === importedBan[field] ||
            (field === 'expires' &&
              ban.expires !== null &&
              importedBan.expires !== null &&
              ban.expires.getTime() === importedBan.expires.getTime())
          )
            continue;

          ban[field] = importedBan[field];
          updated = true;

          // If the ban expired status was updated then it will affect the Steam user's reputation so we consider them
          // updated.
          if (field === 'expired') updatedBannedSteamUsers.push(importedBan.steamUser);
        }

        if (updated) {
          console.log(`Found updated ban reason (${importedBan.id}) in ban list (ID: ${this.id}).`);
          await ban.save();
        }
      } catch (err) {
        console.log(`Failed to save imported ban (ID: ${importedBan.id}): `, err);
      }
    }
    console.log(`Saved ${importedBans.length} bans from ban list (ID: ${this.id}).`);

    // Delete deleted bans
    const deletedBans = await Ban.findAll({
      attributes: ['id', 'steamUser'],
      where: {
        id: { [Op.notIn]: importedBans.map((importedBan) => importedBan.id) },
        banList: this.id
      }
    });
    console.log(`Deleting ${deletedBans.length} bans from ban list (ID: ${this.id})...`);
    for (const deletedBan of deletedBans) {
      console.log(`Deleted ban (${deletedBan.id}) in ban list (ID: ${this.id}).`);
      updatedBannedSteamUsers.push(deletedBan.steamUser);
      await deletedBan.destroy();
    }

    const uniqueSteamIDsToUpdate = [...new Set(updatedBannedSteamUsers)];
    console.log(
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
    console.log(
      `Queued ${uniqueSteamIDsToUpdate.length} Steam users from ban list (ID: ${this.id}) for update.`
    );
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
