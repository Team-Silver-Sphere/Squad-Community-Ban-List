import { ExportBan, ExportBanList } from 'database/models';

export default async (_, args, context) => {
  const exportBanList = await ExportBanList.findOne({
    _id: args._id,
    owner: context.user
  });
  if (exportBanList === null) throw new Error('Export ban list not found.');

  await ExportBanList.deleteOne({ _id: args._id });
  await ExportBan.deleteMany({ banList: args._id });

  return exportBanList;
};
