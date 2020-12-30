import { BanList, ExportBanList } from 'scbl-lib/db/models';

export default {
  ExportBanListConfig: {
    exportBanList: (parent) => {
      return ExportBanList.findByPk(parent.exportBanList);
    },
    banList: (parent) => {
      return BanList.findByPk(parent.banList);
    }
  }
};
