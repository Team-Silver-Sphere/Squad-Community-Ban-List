import { connect, disconnect } from 'scbl-lib/db';

import BanImporter from './ban-importer.js';

const TASKS_TO_COMPLETE = {
  IMPORT_BANS: false,
  UPDATE_STEAM_USER_INFO: false,
  UPDATE_REPUTATION_POINTS: false,
  UPDATE_REPUTATION_RANK: false,
  UPDATE_EXPORT_BANS: true,
  EXPORT_EXPORT_BANS: true
};

async function main() {
  await connect();

  if (TASKS_TO_COMPLETE.IMPORT_BANS) await BanImporter.importBans();
  if (TASKS_TO_COMPLETE.UPDATE_STEAM_USER_INFO) await BanImporter.updateSteamUserInfo();
  if (TASKS_TO_COMPLETE.UPDATE_REPUTATION_POINTS) await BanImporter.updateReputationPoints();
  if (TASKS_TO_COMPLETE.UPDATE_REPUTATION_RANK) await BanImporter.updateReputationRank();
  if (TASKS_TO_COMPLETE.UPDATE_EXPORT_BANS) await BanImporter.updateExportBans();
  if (TASKS_TO_COMPLETE.EXPORT_EXPORT_BANS) await BanImporter.exportExportBans();

  await disconnect();
}

main()
  .then(() => console.log('Done.'))
  .catch(console.log);
