import { ExportBanList } from 'database/models';

export default {
  SteamUser: {
    exportBanLists: async parent => {
      return ExportBanList.find({
        owner: parent.steamID,
        battlemetricsStatus: { $ne: 'deleted' }
      });
    }
  }
};
