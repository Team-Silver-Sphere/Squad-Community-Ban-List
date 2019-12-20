import fs from 'fs';
import path from 'path';

import { SteamUser, ExportBanList } from 'database/models';

export default async (_, args, context) => {
  try {
    JSON.parse(args.config);
  } catch (err) {
    throw new Error('Config not a valid JSON object.');
  }

  const limit = (await SteamUser.findOne({ steamID: context.user }))
    .exportBanListsLimit;
  const currentCount = await ExportBanList.countDocuments({
    owner: context.user
  });
  if (currentCount >= limit)
    throw new Error(
      'You have reached you limit for the number of export ban lists.'
    );

  const exportBanList = new ExportBanList({
    owner: context.user,
    name: args.name,
    config: args.config
  });
  await exportBanList.save();

  fs.writeFileSync(
    path.resolve(`./web-server/export-ban-lists/${exportBanList._id}.txt`),
    `// ID: ${exportBanList._id}, Name: ${exportBanList.name}, Owner: ${context.user}\n`
  );

  return exportBanList;
};
