import { BanList, Organization } from 'database/models';

export default {
  Ban: {
    reason: async parent => {
      const banList = await BanList.findOne({ _id: parent.banList });
      const organization = await Organization.findOne({
        _id: banList.organization
      });

      if (organization.official) return parent.battlemetricsReason;
      else return null;
    },
    banList: async parent => {
      return BanList.findOne({ _id: parent.banList });
    }
  }
};
