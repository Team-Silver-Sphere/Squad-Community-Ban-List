import { ExportBanList } from 'database/models';
import {
  battlemetricsAPIHostname,
  battlemetricsOrganization
} from 'core/config/battlemetrics-api';
import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';

export default class BanListCreator {
  async hasWork() {
    return (
      (await ExportBanList.countDocuments({
        battlemetricsStatus: 'queued',
        battlemetricsID: null
      })) > 0
    );
  }

  async doWork() {
    this.exportBanList = await ExportBanList.findOne({
      battlemetricsStatus: 'queued',
      battlemetricsID: null
    });

    this.log(
      `Creating ban list for export ban list (${this.exportBanList._id}).`
    );

    let error = false;

    try {
      await this.createBanList();
      await this.createBanListInvite();
    } catch (err) {
      this.log(
        `Error creating ban list for export ban list (${this.exportBanList._id}).`
      );

      error = true;
    }

    await ExportBanList.updateOne(
      { _id: this.exportBanList._id },
      {
        battlemetricsStatus: error ? 'errored' : 'queued',
        battlemetricsID: this.exportBanList.battlemetricsID,
        battlemetricsInvite: this.exportBanList.battlemetricsInvite
      }
    );

    if (!error)
      this.log(
        `Created ban list and invite for export ban list (${this.exportBanList._id}).`
      );
  }

  log(msg) {
    console.log(`BanListCreator: ${msg}`);
  }

  async createBanList() {
    const data = {
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
    };

    const response = await battlemetricsAPIGateway(
      'post',
      `${battlemetricsAPIHostname}/ban-lists`,
      data
    );

    this.exportBanList.battlemetricsID = response.data.id;
  }

  async createBanListInvite() {
    const data = {
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
    };

    const response = await battlemetricsAPIGateway(
      'post',
      `${battlemetricsAPIHostname}/ban-lists/${this.exportBanList.battlemetricsID}/relationships/invites`,
      data
    );

    this.exportBanList.battlemetricsInvite = `https://www.battlemetrics.com/rcon/ban-lists/accept-invite?code=${response.data.id}`;
  }
}
