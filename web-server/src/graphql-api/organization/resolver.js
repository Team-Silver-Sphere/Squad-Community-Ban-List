import { BattleMetricsBanList } from 'database/models';

export default {
  Organization: {
    battlemetricsBanList: async parent => {
      return BattleMetricsBanList.find({ organization: parent._id });
    }
  }
};
