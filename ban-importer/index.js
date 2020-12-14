import { connect, disconnect, sequelize } from 'scbl-lib/db';
import { Op } from 'scbl-lib/db/sequelize';
import { BanList, SteamUser } from 'scbl-lib/db/models';
import { steam } from 'scbl-lib/apis';

const TASKS_TO_COMPLETE = [
  'IMPORT_BANS',
  'UPDATE_STEAM_USER_INFO',
  'UPDATE_REPUTATION_POINTS',
  'UPDATE_REPUTATION_RANK'
];

const STEAM_USER_UPDATE_INFO_REFRESH_INTERVAL = 7 * 24 * 60 * 60 * 1000;
const STEAM_USER_UPDATE_INFO_BATCH_SIZE = 10;

async function main() {
  await connect();

  if (TASKS_TO_COMPLETE.includes('IMPORT_BANS')) {
    console.log('Importing bans...');

    const banListsToImport = await BanList.findAll({ attributes: ['id', 'type', 'source'] });

    for (const banList of banListsToImport) {
      try {
        await banList.importBans();
      } catch (err) {
        console.log(`Failed to import ban list (ID: ${banList.id}): `, err);
      }
    }

    console.log('Imported bans.');
  }

  if (TASKS_TO_COMPLETE.includes('UPDATE_STEAM_USER_INFO')) {
    console.log('Updating Steam user info...');

    const steamUsersToUpdateInfo = await SteamUser.findAll({
      attributes: ['id'],
      where: {
        [Op.or]: [
          { lastRefreshedInfo: null },
          {
            lastRefreshedInfo: {
              [Op.lt]: new Date(new Date() - STEAM_USER_UPDATE_INFO_REFRESH_INTERVAL)
            }
          }
        ]
      }
    });

    const steamUsersToUpdateInfoLength = steamUsersToUpdateInfo.length;
    console.log(`Updating info of ${steamUsersToUpdateInfoLength} Steam users...`);
    let batchOfSteamUsersToUpdateInfo = [];
    while (steamUsersToUpdateInfo.length > 0) {
      batchOfSteamUsersToUpdateInfo.push(steamUsersToUpdateInfo.shift().id);

      if (batchOfSteamUsersToUpdateInfo.length < STEAM_USER_UPDATE_INFO_BATCH_SIZE) continue;

      console.log(
        `Updating info on batch of ${batchOfSteamUsersToUpdateInfo.length} Steam users...`
      );
      const { data } = await steam('get', 'ISteamUser/GetPlayerSummaries/v0002', {
        steamids: batchOfSteamUsersToUpdateInfo.join(',')
      });

      for (const steamUser of data.response.players) {
        await SteamUser.update(
          {
            name: steamUser.personaname,
            profileURL: steamUser.profileurl,
            avatar: steamUser.avatar,
            avatarMedium: steamUser.avatarmedium,
            avatarFull: steamUser.avatarfull,
            lastRefreshedInfo: Date.now()
          },
          { where: { id: steamUser.steamid } }
        );
      }

      batchOfSteamUsersToUpdateInfo = [];
    }
    console.log(`Updated info of ${steamUsersToUpdateInfoLength} Steam users.`);
  }

  if (TASKS_TO_COMPLETE.includes('UPDATE_REPUTATION_POINTS')) {
    console.log(`Updating reputation points of outdated Steam users...`);
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
    console.log(`Updated reputation points of outdated Steam users.`);
  }

  if (TASKS_TO_COMPLETE.includes('UPDATE_REPUTATION_RANK')) {
    console.log(`Updating reputation rank of Steam users...`);
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
    console.log(`Updated reputation rank of Steam users.`);
  }

  await disconnect();
}

main()
  .then(() => console.log('Done'))
  .catch(console.log);
