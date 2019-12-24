import { BattleMetricsBanList, BattleMetricsBan } from 'database/models';

export default {
  Organization: {
    battlemetricsBanLists: async parent => {
      return BattleMetricsBanList.find({ organization: parent._id });
    },

    uniqueBannedSteamIDCount: async parent => {
      return (
        await BattleMetricsBan.distinct('steamID', {
          banList: {
            $in: await BattleMetricsBanList.distinct('_id', {
              organization: parent._id
            })
          }
        })
      ).length;
    },

    playerBans: async (parent, filter) => {
      let query = {
        steamID: filter.steamID,

        banList: {
          $in: await BattleMetricsBanList.distinct('_id', {
            organization: parent._id
          })
        }
      };

      if (filter.expired === true)
        query = {
          ...query,
          expires: { $lt: Date.now() }
        };

      if (filter.expired === false)
        query = {
          $or: [
            {
              ...query,
              expires: null
            },
            {
              ...query,
              expires: { $gt: Date.now() }
            }
          ]
        };

      return BattleMetricsBan.find(query);
    }
  }
};
