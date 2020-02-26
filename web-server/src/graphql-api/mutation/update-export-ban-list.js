import { ExportBanList } from 'database/models';

export default async (_, args, context) => {
  const query = { _id: args._id };

  if (!context.isSystemAdmin) {
    query.owner = context.user;
  }
  const exportBanList = await ExportBanList.findOne(query);
  if (exportBanList === null) throw new Error('Export ban list not found.');

  try {
    JSON.parse(args.config);
  } catch (err) {
    throw new Error('Config not a valid JSON object.');
  }

  return ExportBanList.findOneAndUpdate(
    { _id: args._id },
    {
      name: args.name,
      config: args.config,
      generatorStatus: 'queued'
    },
    {
      new: true
    }
  );
};
