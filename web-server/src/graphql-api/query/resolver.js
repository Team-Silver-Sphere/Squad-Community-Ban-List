import { Organization, BattleMetricsBanList } from 'database/models';

export default {
  Query: {
    organizations: async () => {
      return Organization.find();
    },

    battlemetricsBanLists: async () => {
      return BattleMetricsBanList.find();
    }
  }
};