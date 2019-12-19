import { BattleMetricsBanList } from 'database/models';

export default {
  BattlemetricsBan: {
    battlemetricsBanList: async parent => {
      return BattleMetricsBanList.find({ _id: parent.banList });
    }
  }
};
