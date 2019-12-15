import { Organization, BattleMetricsBan } from 'database/models';

export default {
  BattlemetricsBanList: {
    organization: async parent => {
      return Organization.findOne({ _id: parent.organization });
    },

    battlemetricsBanCount: async parent => {
      return BattleMetricsBan.countDocuments({ banList: parent._id });
    },

    uniqueBannedSteamIDCount: async parent => {
      return (
        await BattleMetricsBan.distinct('steamID', { banList: parent._id })
      ).length;
    }
  }
};
