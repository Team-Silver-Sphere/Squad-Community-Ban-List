import { ExportBanList } from 'database/models';

export default {
  SteamUser: {
    exportBanLists: async (parent, filter, context) => {
      const query = { battlemetricsStatus: { $ne: 'deleted' } };

      if (!context.isSystemAdmin) {
        query.owner = parent.steamID;
      }

      return ExportBanList.find(query);
    }
  }
};
