import { ExportBanList } from 'database/models';

export default {
  ExportBan: {
    exportBanList: async parent => {
      return ExportBanList.findOne({ _id: parent.exportBanList });
    }
  }
};
