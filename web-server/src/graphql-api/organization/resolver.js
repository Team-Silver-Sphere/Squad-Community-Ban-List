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
      return BattleMetricsBan.find({
        banList: {
          $in: await BattleMetricsBanList.distinct('_id', {
            organization: parent._id
          })
        },
        steamID: filter.steamID
      });
    }
  }
};
