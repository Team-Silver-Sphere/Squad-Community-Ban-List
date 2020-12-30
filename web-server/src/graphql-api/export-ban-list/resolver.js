import { ExportBanListConfig } from 'scbl-lib/db/models';

export default {
  ExportBanList: {
    exportBanListConfigs: (parent) => {
      return ExportBanListConfig.findAll({ where: { exportBanList: parent.id } });
    }
  }
};
