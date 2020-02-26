import { ExportBanList } from 'database/models';

export default {
  SteamUser: {
    exportBanLists: async (parent, filter, context) => {
      const query = {
        battlemetricsStatus: { $nin: ['deleted', 'deleted-errored'] }
      };

      if (!context.isSystemAdmin) {
        query.owner = parent.steamID;
      }

      return ExportBanList.find(query);
    }
  }
};
