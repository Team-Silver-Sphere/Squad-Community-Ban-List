import { steam } from 'scbl-lib/apis';
import { sequelize } from 'scbl-lib/db';
import { BanList, ExportBan, ExportBanList, SteamUser } from 'scbl-lib/db/models';
import { Op, QueryTypes } from 'scbl-lib/db/sequelize';
import { Logger } from 'scbl-lib/utils';

const UPDATE_STEAM_USER_INFO_REFRESH_INTERVAL = 7 * 24 * 60 * 60 * 1000;
const UPDATE_STEAM_USER_INFO_BATCH_SIZE = 10;

export default class BanImporter {
  static async importBans() {
    Logger.verbose('BanImporter', 1, 'Fetching ban lists to import...');
    const lists = await BanList.findAll({ attributes: ['id', 'type', 'source'] });

    Logger.verbose('BanImporter', 1, `Importing ${lists.length} ban lists...`);
    for (const list of lists) {
      try {
        await list.importBans();
      } catch (err) {
        Logger.verbose('BanImporter', 1, `Failed to import ban list (ID: ${list.id}): `, err);
      }
    }
    Logger.verbose('BanImporter', 1, 'Finished importing ban lists.');
  }

  static async updateSteamUserInfo() {
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

    Logger.verbose('BanImporter', 1, `Updating ${users.length} Steam users...`);
    while (users.length > 0) {
      const batch = users.splice(0, Math.min(UPDATE_STEAM_USER_INFO_BATCH_SIZE, users.length));

      Logger.verbose(
        'BanImporter',
        1,
        `Updating batch of ${batch.length} Steam users (${users.length} remaining)...`
      );

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

  static async updateReputationPoints() {
    Logger.verbose('BanImporter', 1, 'Updating reputation points of outdated Steam users...');
    await sequelize.query(
      `
        UPDATE SteamUsers SU
        LEFT JOIN (
            SELECT
                A.steamUser,
                SUM(A.activePoints) + SUM(A.expiredPoints) AS "points"
            FROM (
                SELECT
                    B.steamUser AS "steamUser",
                    B.banList AS "banList",
                    IF(SUM(IF(B.expired, 0, 1)) > 0, 3, 0) AS "activePoints",
                    SUM(IF(B.expired, 1, 0)) AS "expiredPoints"
                FROM Bans B
                GROUP BY B.steamUser, B.banList
            ) A
            GROUP BY A.steamUser
        ) P ON SU.id = P.steamUser
        SET
            SU.reputationPoints = P.points,
            SU.lastRefreshedReputationPoints = NOW()
        WHERE SU.lastRefreshedReputationPoints IS NULL
      `
    );
  }

  static async updateReputationRank() {
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
  }

  static async updateExportBans() {
    Logger.verbose('BanImporter', 1, 'Generating export ban...');
    const generatedBans = await sequelize.query(
      `
        SELECT
          A.steamUser,
          A.exportBanList,
          IF(SUM(A.activePoints) + SUM(A.expiredPoints) >= A.threshold, 1, 0) AS "banned"
        FROM (
          SELECT
            B.steamUser AS "steamUser",
            EBL.id AS "exportBanList",
            EBL.threshold AS "threshold",
            IF(
              SUM(
                IF(B.expired, 0, 1)
              ) > 0,
              IFNULL(
                MAX(EBLC.activePoints),
                MAX(EBL.defaultActivePoints)
              ),
              0
            ) AS "activePoints",
            SUM(
              IF(
                B.expired,
                IFNULL(
                  EBLC.expiredPoints,
                  EBL.defaultExpiredPoints
                ),
                0
              )
            ) AS "expiredPoints"
          FROM Bans B
          CROSS JOIN ExportBanLists EBL
          LEFT JOIN ExportBanListConfigs EBLC ON EBL.id = EBLC.exportBanList
          JOIN SteamUsers SU ON B.steamUser = SU.id
          WHERE SU.lastRefreshedExport IS NULL or EBL.generated = FALSE
          GROUP BY B.steamUser, B.banList, EBL.id
        ) A
        GROUP BY A.steamUser, A.exportBanList
        HAVING banned
      `,
      { type: QueryTypes.SELECT }
    );

    Logger.verbose('BanImporter', 1, 'Generating export ban IDs...');
    generatedBans.forEach((generatedBan) => {
      generatedBan.id = `${generatedBan.steamUser},${generatedBan.exportBanList}`;
    });

    Logger.verbose('BanImporter', 1, 'Saving export bans...');
    for (const generatedBan of generatedBans) {
      const [exportBan, created] = await ExportBan.findOrCreate({
        where: { id: generatedBan.id },
        defaults: {
          id: generatedBan.id,
          status: 'TO_BE_CREATED',
          steamUser: generatedBan.steamUser,
          exportBanList: generatedBan.exportBanList
        }
      });

      if (created) {
        Logger.verbose('BanImporter', 1, `Created new export ban (ID: ${generatedBan.id}).`);
        continue;
      }

      if (exportBan.status === 'TO_BE_DELETED') {
        Logger.verbose(
          'BanImporter',
          1,
          `Cancelled deletion of export ban (ID: ${generatedBan.id}).`
        );
        exportBan.status = 'CREATED';
        await exportBan.save();
      }
    }

    Logger.verbose('BanImporter', 1, 'Removing deleted export bans...');
    await ExportBan.update(
      { status: 'TO_BE_DELETED' },
      {
        where: {
          id: {
            [Op.notIn]: generatedBans.map((generatedBan) => generatedBan.id)
          },
          steamUser: {
            [Op.in]: generatedBans.map((generatedBan) => generatedBan.steamUser)
          },
          status: 'CREATED'
        }
      }
    );

    await ExportBan.destroy({
      where: {
        id: {
          [Op.notIn]: generatedBans.map((generatedBan) => generatedBan.id)
        },
        steamUser: {
          [Op.in]: generatedBans.map((generatedBan) => generatedBan.steamUser)
        },
        status: 'TO_BE_CREATED'
      }
    });

    Logger.verbose('BanImporter', 1, 'Updating last refreshed export date for Steam users...');
    await SteamUser.update(
      { lastRefreshedExport: Date.now() },
      { where: { lastRefreshedExport: null } }
    );

    Logger.verbose('BanImporter', 1, 'Updating generated status for ban lists...');
    await ExportBanList.update(
      { generated: true },
      {
        where: {
          id: {
            [Op.in]: [...new Set(generatedBans.map((generatedBan) => generatedBan.exportBanList))]
          }
        }
      }
    );
  }

  static async exportExportBans() {
    const exportBans = await ExportBan.findAll({
      where: { status: { [Op.in]: ['TO_BE_CREATED', 'TO_BE_DELETED'] } },
      include: ExportBanList
    });

    for (const exportBan of exportBans) {
      Logger.verbose(
        'BanImporter',
        1,
        `${exportBan.status === 'TO_BE_CREATED' ? 'Creat' : 'Delet'}ing export ban (ID: ${
          exportBan.id
        })...`
      );
      try {
        if (exportBan.status === 'TO_BE_CREATED') {
          if (exportBan.ExportBanList.type === 'battlemetrics')
            await exportBan.createBattlemetricsBan();

          exportBan.status = 'CREATED';
          await exportBan.save();
        } else {
          if (exportBan.ExportBanList.type === 'battlemetrics')
            await exportBan.deleteBattlemetricsBan();
          await exportBan.destroy();
        }
      } catch (err) {
        Logger.verbose(
          'BanImporter',
          1,
          `Failed to ${
            exportBan.status === 'TO_BE_CREATED' ? 'create' : 'delete'
          } export ban (ID: ${exportBan.id}): `,
          err
        );
      }
    }
  }
}
