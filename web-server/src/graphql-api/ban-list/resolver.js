import { Organization, Ban } from 'database/models';

export default {
  BanList: {
    organization: async parent => {
      return Organization.findOne({ _id: parent.organization });
    },

    banCount: async parent => {
      return Ban.countDocuments({ banList: parent._id });
    },

    uniqueBannedSteamIDCount: async parent => {
      return (await Ban.distinct('steamID', { banList: parent._id })).length;
    },

    playerBans: async (parent, filter) => {
      const query = {
        steamID: filter.steamID,
        banList: parent._id
      };

      if ('expired' in filter) query.expired = filter.expired;

      return Ban.find(query);
    }
  }
};
