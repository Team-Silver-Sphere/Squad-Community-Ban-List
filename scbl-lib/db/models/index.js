import Ban from './ban.js';
import BanList from './ban-list.js';
import ExportBanList from './export-ban-list.js';
import ExportBanListConfig from './export-ban-list-configs.js';
import Organisation from './organisation.js';
import SteamUser from './steam-user.js';

// Assign relationships
Ban.belongsTo(BanList, { foreignKey: { name: 'banList', allowNull: false }, onDelete: 'CASCADE' });
Ban.belongsTo(SteamUser, {
  foreignKey: { name: 'steamUser', allowNull: false },
  onDelete: 'CASCADE'
});

BanList.belongsTo(Organisation, {
  foreignKey: { name: 'organisation', allowNull: false },
  onDelete: 'CASCADE'
});

ExportBanList.belongsTo(SteamUser, {
  foreignKey: { name: 'owner', allowNull: false },
  onDelete: 'CASCADE'
});

ExportBanListConfig.belongsTo(BanList, {
  foreignKey: { name: 'banList', allowNull: false },
  onDelete: 'CASCADE'
});
ExportBanListConfig.belongsTo(ExportBanList, {
  foreignKey: { name: 'exportBanList', allowNull: false },
  onDelete: 'CASCADE'
});

export { Ban, BanList, ExportBanList, ExportBanListConfig, Organisation, SteamUser };
