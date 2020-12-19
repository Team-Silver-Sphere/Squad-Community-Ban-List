import { connect, disconnect } from 'scbl-lib/db';

import BanImporter from './ban-importer.js';

const TASKS_TO_COMPLETE = {
  IMPORT_BANS: true,
  UPDATE_STEAM_USER_INFO: true,
  UPDATE_REPUTATION_POINTS: true,
  UPDATE_REPUTATION_RANK: true
};

async function main() {
  await connect();

  const banImporter = new BanImporter();

  if (TASKS_TO_COMPLETE.IMPORT_BANS) await banImporter.importBans();
  if (TASKS_TO_COMPLETE.UPDATE_STEAM_USER_INFO) await banImporter.updateSteamUserInfo();
  if (TASKS_TO_COMPLETE.UPDATE_REPUTATION_POINTS) await banImporter.updateReputationPoints();
  if (TASKS_TO_COMPLETE.UPDATE_REPUTATION_RANK) await banImporter.updateReputationRank();

  await disconnect();
}

main()
  .then(() => console.log('Done.'))
  .catch(console.log);
