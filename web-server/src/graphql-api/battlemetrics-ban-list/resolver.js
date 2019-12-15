import { Organization } from 'database/models';

export default {
  BattlemetricsBanList: {
    organization: async parent => {
      return Organization.findOne({ _id: parent.organization });
    }
  }
};
