import addBattlemetricsBanList from './add-battlemetrics-ban-list.js';
import createExportBanList from './create-export-ban-list.js';
import createOrganization from './create-organization.js';
import deleteExportBanList from './delete-export-ban-list.js';
import updateOrganization from './update-organization.js';
import updateExportBanList from './update-export-ban-list.js';
import updateBattlemetricsBanList from './update-battlemetrics-ban-list.js';

export default {
  Mutation: {
    addBattlemetricsBanList,
    createExportBanList,
    createOrganization,
    deleteExportBanList,
    updateOrganization,
    updateExportBanList,
    updateBattlemetricsBanList
  }
};
