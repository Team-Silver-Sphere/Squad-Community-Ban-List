import {
  Organization,
  BattleMetricsBan,
  BattleMetricsBanList,
  SteamUser
} from 'database/models';

export default {
  Query: {
    organizations: async () => {
      return Organization.find().sort({ name: 1 });
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
    },

    currentSteamUser: async (parent, _, context) => {
      return SteamUser.findOne({ steamID: context.user });
    }
  }
};
