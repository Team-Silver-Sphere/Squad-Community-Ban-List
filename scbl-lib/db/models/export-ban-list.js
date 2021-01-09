import Sequelize from 'sequelize';

import sequelize from '../sequelize.js';

import { battlemetrics } from '../../apis/index.js';
import { Logger } from '../../utils/index.js';
import { BATTLEMETRICS_ORGANIZATION } from '../../config.js';

const { DataTypes } = Sequelize;

class ExportBanList extends Sequelize.Model {
  async createBattlemetricsBanList() {
    Logger.verbose('ExportBanList', 1, 'Creating Battlemetrics ban list...');
    if (this.battlemetricsID) throw new Error('Battlemetrics ban list already exists.');

    const {
      data: { data: dataBanList }
    } = await battlemetrics(
      'post',
      'ban-lists',
      {},
      {
        data: {
          type: 'banList',
          attributes: {
            name: `Squad Community Ban List - ${this.name} (ID: ${this.id})`,
            action: 'none',
            defaultIdentifiers: ['steamID'],
            defaultReasons: [
              'Banned by the Squad Community Ban List (squad-community-ban-list.com)'
            ],
            defaultAutoAddEnabled: true
          },
          relationships: {
            organization: {
              data: {
                type: 'organization',
                id: BATTLEMETRICS_ORGANIZATION
              }
            },
            owner: {
              data: {
                type: 'organization',
                id: BATTLEMETRICS_ORGANIZATION
              }
            }
          }
        }
      }
    );

    this.battlemetricsID = dataBanList.id;

    await this.save();

    Logger.verbose('ExportBanList', 1, ' Creating Battlemetrics ban list invite...');
    const {
      data: { data: inviteData }
    } = await battlemetrics(
      'post',
      `ban-lists/${this.battlemetricsID}/relationships/invites`,
      {},
      {
        data: {
          type: 'banListInvite',
          attributes: {
            limit: null,
            permManage: false,
            permCreate: false,
            permUpdate: false,
            permDelete: false
          },
          relationships: {
            organization: {
              data: {
                type: 'organization',
                id: BATTLEMETRICS_ORGANIZATION
              }
            }
          }
        }
      }
    );

    this.battlemetricsInvite = `https://www.battlemetrics.com/rcon/ban-lists/accept-invite?code=${inviteData.id}`;

    await this.save();
  }

  async deleteBattlemetricsBanList() {
    if (!this.battlemetricsID) {
      Logger.verbose('ExportBanList', 1, 'No Battlemetrics ban list to delete.');
      return;
    }

    Logger.verbose('ExportBanList', 1, 'Deleting Battlemetrics ban list...');
    await battlemetrics(
      'delete',
      `ban-lists/${this.battlemetricsID}/relationships/organizations/${BATTLEMETRICS_ORGANIZATION}`
    );

    this.battlemetricsID = null;
    this.battlemetricsInvite = null;

    await this.save();
  }
}

ExportBanList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    server: {
      type: DataTypes.STRING
    },

    type: {
      type: DataTypes.ENUM('remote', 'battlemetrics'),
      defaultValue: 'remote'
    },

    threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    },
    defaultActivePoints: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    defaultExpiredPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    maxBanAge: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    discordWebhook: {
      type: DataTypes.STRING
    },

    generated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    battlemetricsID: {
      type: DataTypes.STRING
    },
    battlemetricsInvite: {
      type: DataTypes.STRING
    }
  },
  { sequelize }
);

export default ExportBanList;
