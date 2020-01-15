import { Ban, BanList } from 'database/models';

export default {
  Organization: {
    banCount: async parent => {
      return Ban.countDocuments({
        banList: { $in: await BanList.distinct({ organization: parent._id }) }
      });
    },

    uniqueBannedSteamIDCount: async parent => {
      return (
        await Ban.distinct('steamID', {
          banList: {
            $in: await BanList.distinct('_id', { organization: parent._id })
          }
        })
      ).length;
    },

    banLists: async parent => {
      return BanList.find({ organization: parent._id });
    }
  }
};
