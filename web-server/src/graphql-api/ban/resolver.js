import { BanList } from 'database/models';

export default {
  Ban: {
    banList: async parent => {
      return BanList.findOne({ _id: parent.banList });
    }
  }
};
