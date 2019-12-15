import {
  Organization,
  BattleMetricsBan,
  BattleMetricsBanList
} from 'database/models';

export default {
  Query: {
    organizations: async () => {
      return Organization.find();
    },

    organizationCount: async () => {
      return Organization.countDocuments();
    },

    battlemetricsBanLists: async () => {
      return BattleMetricsBanList.find();
    },

    battlemetricsBanListCount: async () => {
      return BattleMetricsBanList.countDocuments();
    },

    battlemetricsBanCount: async () => {
      return BattleMetricsBan.countDocuments();
    },

    uniqueBannedSteamIDCount: async () => {
      return (await BattleMetricsBan.distinct('steamID')).length;
    }
  }
};
