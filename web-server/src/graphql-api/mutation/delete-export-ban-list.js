import { ExportBan, ExportBanList } from 'database/models';

export default async (_, args, context) => {
  const query = { _id: args._id };

  if (!context.isSystemAdmin) {
    query.owner = context.user;
  }
  const exportBanList = await ExportBanList.findOne(query);
  if (exportBanList === null) throw new Error('Export ban list not found.');

  if (exportBanList.battlemetricsStatus === 'disabled') {
    await ExportBanList.deleteOne({ _id: args._id });
  } else {
    await ExportBanList.updateOne(
      { _id: args._id },
      { battlemetricsStatus: 'deleted' }
    );
  }
  await ExportBan.deleteMany({ banList: args._id });

  return exportBanList;
};
