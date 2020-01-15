import { ExportBan } from 'database/models';
import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';
import {
  battlemetricsAPIHostname,
  battlemetricsOrganization
} from 'core/config/battlemetrics-api';

export default class BanManager {
  async hasWork() {
    return (
      (await ExportBan.countDocuments({
        battlemetricsStatus: { $in: ['queued', 'deleted'] }
      })) > 0
    );
  }

  async doWork() {
    this.exportBan = await ExportBan.findOne({
      battlemetricsStatus: { $in: ['queued', 'deleted'] }
    }).populate('exportBanList');

    switch (this.exportBan.battlemetricsStatus) {
      case 'queued':
        await this.createBan();
        break;
      case 'deleted':
        await this.deleteBan();
        break;
      default:
        this.log(`Unknown status on export ban list (${this.exportBan._id}`);
    }
  }

  log(msg) {
    console.log(`BanManager: ${msg}`);
  }

  async createBan() {
    this.log(`Creating ban for export ban (${this.exportBan._id}).`);

    try {
      const response = await battlemetricsAPIGateway(
        'post',
        `${battlemetricsAPIHostname}/bans`,
        {
          data: {
            type: 'ban',
            attributes: {
              autoAddEnabled: true,
              expires: null,
              identifiers: [
                {
                  type: 'steamID',
                  identifier: this.exportBan.steamID,
                  manual: true
                }
              ],
              nativeEnabled: null,
              note: null,
              reason:
                'Banned by the Squad Community Ban List (squad-community-ban-list.com)'
            },
            relationships: {
              organization: {
                data: {
                  type: 'organization',
                  id: battlemetricsOrganization
                }
              },
              banList: {
                data: {
                  type: 'banList',
                  id: this.exportBan.exportBanList.battlemetricsID
                }
              }
            }
          }
        }
      );

      this.exportBan.battlemetricsID = response.data.id;

      this.log(`Created ban for export ban (${this.exportBan._id}).`);
      await ExportBan.updateOne(
        { _id: this.exportBan._id },
        {
          battlemetricsStatus: 'completed',
          battlemetricsID: this.exportBan.battlemetricsID
        }
      );
    } catch (err) {
      this.log(`Error creating ban for export ban (${this.exportBan._id}).`);

      await ExportBan.updateOne(
        { _id: this.exportBan._id },
        {
          battlemetricsStatus: 'queued-errored',
          battlemetricsID: this.exportBan.battlemetricsID,
          battlemetricsInvite: this.exportBan.battlemetricsInvite
        }
      );
    }
  }

  async deleteBan() {
    this.log(`Deleting ban for export ban (${this.exportBan._id}).`);

    try {
      await battlemetricsAPIGateway(
        'delete',
        `${battlemetricsAPIHostname}/bans/${this.exportBan.battlemetricsID}`
      );

      this.log(`Deleted ban for export ban (${this.exportBan._id}).`);
      await ExportBan.deleteOne({ _id: this.exportBan._id });
    } catch (err) {
      this.log(`Error deleting ban for export ban (${this.exportBan._id}).`);

      await ExportBan.updateOne(
        { _id: this.exportBan._id },
        { battlemetricsStatus: 'deleted-errored' }
      );
    }
  }
}
