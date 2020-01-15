import { ExportBan, SteamUser } from 'database/models';

export default {
  ExportBanList: {
    banCount: async parent => {
      return ExportBan.countDocuments({
        battlemetricsStatus: { $nin: ['deleted', 'deleted-errored'] },
        exportBanList: parent._id
      });
    },
    owner: async parent => {
      return SteamUser.findOne({ steamID: parent.owner });
    }
  }
};
