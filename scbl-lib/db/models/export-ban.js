import Sequelize from 'sequelize';

import { battlemetrics } from '../../apis/index.js';
import { BATTLEMETRICS_ORGANIZATION } from '../../config.js';
import { Logger } from '../../utils/index.js';

import sequelize from '../sequelize.js';

const { DataTypes } = Sequelize;

class ExportBan extends Sequelize.Model {
  async createBattlemetricsBan() {
    if (!this.ExportBanList) await this.getExportBanList();

    Logger.verbose('ExportBan', 1, 'Creating Battlemetrics ban...');
    const {
      data: { data: banData }
    } = await battlemetrics(
      'post',
      'bans',
      {},
      {
        data: {
          type: 'ban',
          attributes: {
            autoAddEnabled: true,
            expires: null,
            identifiers: [
              {
                type: 'steamID',
                identifier: this.steamUser,
                manual: true
              }
            ],
            nativeEnabled: null,
            note: null,
            reason: 'Banned by the Squad Community Ban List (squad-community-ban-list.com)'
          },
          relationships: {
            organization: {
              data: {
                type: 'organization',
                id: BATTLEMETRICS_ORGANIZATION
              }
            },
            banList: {
              data: {
                type: 'banList',
                id: this.ExportBanList.battlemetricsID
              }
            }
          }
        }
      }
    );

    this.battlemetricsID = banData.id;

    await this.save();
  }

  async deleteBattlemetricsBan() {
    if (!this.exportBanList) await this.getExportBanList();

    Logger.verbose('ExportBan', 1, 'Deleting Battlemetrics ban...');
    await battlemetrics('delete', `bans/${this.battlemetricsID}`);

    this.battlemetricsID = null;

    await this.save();
  }
}

ExportBan.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('TO_BE_CREATED', 'CREATED', 'TO_BE_DELETED'),
      notNull: true,
      defaultValue: 'TO_BE_CREATED'
    },

    battlemetricsID: {
      type: DataTypes.STRING
    }
  },
  { sequelize }
);

export default ExportBan;
