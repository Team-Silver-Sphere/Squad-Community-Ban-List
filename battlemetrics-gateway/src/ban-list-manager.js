import { ExportBanList } from 'database/models';
import {
  battlemetricsAPIHostname,
  battlemetricsOrganization
} from 'core/config/battlemetrics-api';
import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';

export default class BanListManager {
  async hasWork() {
    return (
      (await ExportBanList.countDocuments({
        battlemetricsStatus: { $in: ['queued', 'deleted'] }
      })) > 0
    );
  }

  async doWork() {
    this.exportBanList = await ExportBanList.findOne({
      battlemetricsStatus: { $in: ['queued', 'deleted'] }
    });

    switch (this.exportBanList.battlemetricsStatus) {
      case 'queued':
        await this.createBanList();
        break;
      case 'deleted':
        await this.deleteBanList();
        break;
      default:
        this.log(
          `Unknown status on export ban list (${this.exportBanList._id}`
        );
    }
  }

  log(msg) {
    console.log(`BanListCreator: ${msg}`);
  }

  async createBanList() {
    this.log(
      `Creating ban list for export ban list (${this.exportBanList._id}).`
    );

    try {
      const createResponse = await battlemetricsAPIGateway(
        'post',
        `${battlemetricsAPIHostname}/ban-lists`,
        {
          data: {
            type: 'banList',
            attributes: {
              name: this.exportBanList._id,
              action: 'none',
              defaultIdentifiers: ['steamID'],
              defaultReasons: ['Banned by squad-community-ban-list.com'],
              defaultAutoAddEnabled: false
            },
            relationships: {
              organization: {
                data: {
                  type: 'organization',
                  id: battlemetricsOrganization
                }
              },
              owner: {
                data: {
                  type: 'organization',
                  id: battlemetricsOrganization
                }
              }
            }
          }
        }
      );

      this.exportBanList.battlemetricsID = createResponse.data.id;

      const inviteResponse = await battlemetricsAPIGateway(
        'post',
        `${battlemetricsAPIHostname}/ban-lists/${this.exportBanList.battlemetricsID}/relationships/invites`,
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
                  id: battlemetricsOrganization
                }
              }
            }
          }
        }
      );

      this.exportBanList.battlemetricsInvite = `https://www.battlemetrics.com/rcon/ban-lists/accept-invite?code=${inviteResponse.data.id}`;

      this.log(
        `Created ban list and invite for export ban list (${this.exportBanList._id}).`
      );
      await ExportBanList.updateOne(
        { _id: this.exportBanList._id },
        {
          battlemetricsStatus: 'completed',
          battlemetricsID: this.exportBanList.battlemetricsID,
          battlemetricsInvite: this.exportBanList.battlemetricsInvite
        }
      );
    } catch (err) {
      this.log(
        `Error creating ban list for export ban list (${this.exportBanList._id}).`
      );

      await ExportBanList.updateOne(
        { _id: this.exportBanList._id },
        {
          battlemetricsStatus: 'queued-errored',
          battlemetricsID: this.exportBanList.battlemetricsID,
          battlemetricsInvite: this.exportBanList.battlemetricsInvite
        }
      );
    }
  }

  async deleteBanList() {
    this.log(
      `Deleting ban list for export ban list (${this.exportBanList._id}).`
    );

    try {
      await battlemetricsAPIGateway(
        'delete',
        `${battlemetricsAPIHostname}/ban-lists/${this.exportBanList.battlemetricsID}/relationships/organizations/${battlemetricsOrganization}`
      );

      this.log(
        `Deleted ban list for export ban list (${this.exportBanList._id}).`
      );
      await ExportBanList.deleteOne({ _id: this.exportBanList._id });
    } catch (err) {
      this.log(
        `Error deleting ban list for export ban list (${this.exportBanList._id}).`
      );

      await ExportBanList.updateOne(
        { _id: this.exportBanList._id },
        { battlemetricsStatus: 'deleted-errored' }
      );
    }
  }
}
