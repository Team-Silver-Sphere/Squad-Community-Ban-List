import Ban from './ban.js';
import BanList from './ban-list.js';
import ExportBanList from './export-ban-list.js';
import Organisation from './organisation.js';
import SteamUser from './steam-user.js';

// Assign relationships
Organisation.hasMany(BanList, {
  foreignKey: { name: 'organisation', allowNull: false },
  onDelete: 'CASCADE'
});

BanList.hasMany(Ban, {
  foreignKey: { name: 'banList', allowNull: false },
  onDelete: 'CASCADE'
});

SteamUser.hasMany(Ban, {
  foreignKey: { name: 'steamUser', allowNull: false },
  onDelete: 'CASCADE'
});

SteamUser.hasMany(ExportBanList, {
  foreignKey: { name: 'owner', allowNull: false },
  onDelete: 'CASCADE'
});

export { Ban, BanList, ExportBanList, Organisation, SteamUser };
