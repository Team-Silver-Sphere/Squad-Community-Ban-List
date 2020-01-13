import { Ban, BanList } from 'database/models';

export default {
  Organization: {
    banCount: async parent => {
      return Ban.countDocuments({
        banLists: { $in: await BanList.distinct({ organisation: parent._id }) }
      });
    },

    uniqueBannedSteamIDCount: async parent => {
      return (
        await Ban.distinct('steamID', {
          banLists: {
            $in: await BanList.distinct('_id', { organisation: parent._id })
          }
        })
      ).length;
    },

    banLists: async parent => {
      return BanList.find({ organization: parent._id });
    }
  }
};
