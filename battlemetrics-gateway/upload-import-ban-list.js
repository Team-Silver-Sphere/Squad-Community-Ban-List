import { Ban, BanList } from 'database/models';

import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';
import {
  battlemetricsAPIHostname,
  battlemetricsOrganization
} from 'core/config/battlemetrics-api';

async function main() {
  if (process.argv.length !== 4) throw new Error('Invalid number of args.');

  const banList = await BanList.findOne({ battlemetricsID: process.argv[2] });

  if (banList === null) throw new Error('Ban list not found.');

  const bans = await Ban.find({ banList: banList._id });

  for (const ban of bans) {
    try {
      await battlemetricsAPIGateway(
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
                  identifier: ban.steamID,
                  manual: true
                }
              ],
              nativeEnabled: null,
              note: ban.battlemetricsNote,
              reason: ban.battlemetricsReason
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
                  id: process.argv[3]
                }
              }
            }
          }
        }
      );

      this.log(`Created ban for ban (${ban._id}).`);
    } catch (err) {
      this.log(`Error creating ban for ban (${ban._id}).`);
    }
  }
}

main();
