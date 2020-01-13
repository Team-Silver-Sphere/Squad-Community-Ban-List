import { BanList } from 'database/models';

export default {
  Ban: {
    banList: async parent => {
      return BanList.find({ _id: parent.banList });
    }
  }
};
