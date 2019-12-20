import fs from 'fs';
import path from 'path';

import { ExportBanList } from 'database/models';

export default async (_, args, context) => {
  const exportBanList = await ExportBanList.findOne({
    _id: args._id,
    owner: context.user
  });
  if (exportBanList === null) throw new Error('Export ban list not found.');

  await ExportBanList.deleteOne({ _id: args._id });

  const exportBanListPath = path.resolve(
    `./web-server/export-ban-lists/${exportBanList._id}.txt`
  );
  if (fs.existsSync(exportBanListPath)) fs.unlinkSync(exportBanListPath);

  return exportBanList;
};
