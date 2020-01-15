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
      let query = {
        steamID: filter.steamID,
        banList: parent._id
      };

      if (filter.expired === true)
        query = {
          ...query,
          expires: { $lt: Date.now() }
        };

      if (filter.expired === false)
        query = {
          $or: [
            {
              ...query,
              expires: null
            },
            {
              ...query,
              expires: { $gt: Date.now() }
            }
          ]
        };

      return Ban.find(query);
    }
  }
};
