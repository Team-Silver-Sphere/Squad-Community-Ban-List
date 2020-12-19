import { steam } from 'scbl-lib/apis';
import { BanList, SteamUser } from 'scbl-lib/db/models';
import { Op } from 'scbl-lib/db/sequelize';
import { Logger } from 'scbl-lib/utils';
import { sequelize } from 'scbl-lib/db';

const UPDATE_STEAM_USER_INFO_REFRESH_INTERVAL = 7 * 24 * 60 * 60 * 1000;
const UPDATE_STEAM_USER_INFO_BATCH_SIZE = 10;

export default class BanImporter {
  async importBans() {
    Logger.verbose('BanImporter', 1, 'Fetching ban lists to import...');
    const lists = await BanList.findAll({ attributes: ['id', 'type', 'source'] });

    Logger.verbose('BanImporter', 1, 'Importing ban lists...');
    for (const list of lists) {
      try {
        await list.importBans();
      } catch (err) {
        Logger.verbose('BanImporter', 1, `Failed to import ban list (ID: ${list.id}): `, err);
      }
    }

    Logger.verbose('BanImporter', 1, 'Finished importing ban lists.');
  }

  async updateSteamUserInfo() {
    Logger.verbose('BanImporter', 1, 'Fetching Steam users to update...');
    const users = await SteamUser.findAll({
      attributes: ['id'],
      where: {
        [Op.or]: [
          { lastRefreshedInfo: null },
          {
            lastRefreshedInfo: {
              [Op.lt]: new Date(new Date() - UPDATE_STEAM_USER_INFO_REFRESH_INTERVAL)
            }
          }
        ]
      }
    });

    Logger.verbose('BanImporter', 1, 'Updating Steam users...');
    while (users.length > 0) {
      const batch = users.splice(0, Math.min(UPDATE_STEAM_USER_INFO_BATCH_SIZE, users.length));

      Logger.verbose('BanImporter', 1, `Updating batch of ${batch.length} Steam users...`);

      try {
        const { data } = await steam('get', 'ISteamUser/GetPlayerSummaries/v0002', {
          steamids: batch.map((user) => user.id).join(',')
        });

        for (const user of data.response.players) {
          await SteamUser.update(
            {
              name: user.personaname,
              profileURL: user.profileurl,
              avatar: user.avatar,
              avatarMedium: user.avatarmedium,
              avatarFull: user.avatarfull,
              lastRefreshedInfo: Date.now()
            },
            { where: { id: user.steamid } }
          );
        }
      } catch (err) {
        Logger.verbose(
          'BanImporter',
          1,
          `Failed to update batch of ${batch.length} Steam users: `,
          err
        );
      }
    }

    Logger.verbose('BanImporter', 1, 'Finished updating Steam users.');
  }

  async updateReputationPoints() {
    Logger.verbose('BanImporter', 1, 'Updating reputation points of outdated Steam users...');
    await sequelize.query(
      `
        UPDATE SteamUsers su
        LEFT JOIN (
          SELECT
            sui.id AS "id",
            (COUNT(IF(!b.expired, 1, NULL)) * 3) + (COUNT(IF(b.expired, 1, NULL)) * 1) AS "reputationPoints"
          FROM Bans b
          JOIN SteamUsers sui ON sui.id = b.steamUser
          WHERE sui.lastRefreshedReputationPoints IS NULL
          GROUP BY steamUser
        ) rp ON su.id = rp.id
        SET 
            su.reputationPoints = rp.reputationPoints,
            lastRefreshedReputationPoints = NOW()
        WHERE lastRefreshedReputationPoints IS NULL
      `
    );
    Logger.verbose('BanImporter', 1, 'Updated reputation points of outdated Steam users.');
  }

  async updateReputationRank() {
    Logger.verbose('BanImporter', 1, 'Updating reputation rank of Steam users...');
    await sequelize.query(
      `
        UPDATE SteamUsers su
        LEFT JOIN (
          SELECT id, RANK() OVER (ORDER BY reputationPoints DESC) AS "reputationRank"
          FROM SteamUsers
        ) rr ON su.id = rr.id
        SET 
            su.reputationRank = rr.reputationRank,
            lastRefreshedReputationRank = NOW();
      `
    );
    Logger.verbose('BanImporter', 1, 'Updated reputation rank of Steam users.');
  }
}
