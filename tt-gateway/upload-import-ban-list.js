import connect from 'database/utils/connect';
import { Ban, BanList } from 'database/models';

import battlemetricsAPIGateway from 'core/utils/battlemetrics-api-gateway';
import {
  battlemetricsAPIHostname,
  battlemetricsOrganization
} from 'core/config/battlemetrics-api';

async function main() {
  if (process.argv.length !== 4) throw new Error('Invalid number of args.');

  console.log('Connecting to DB.');
  await connect();

  const banList = await BanList.findOne({ battlemetricsID: process.argv[2] });

  if (banList === null) throw new Error('Ban list not found.');

  console.log(`Internal ban list ID: ${banList._id}`);

  const bans = await Ban.find({ banList: banList._id });

  console.log(`Uploading ${bans.length} bans.`);

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
              expires: ban.battlemetricsExpires,
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

      console.log(`Created ban for ban (${ban._id}).`);
    } catch (err) {
      console.log(`Error creating ban for ban (${ban._id}).`);
    }
  }
}

main()
  .then(() => console.log('Done!'))
  .catch(console.log);
