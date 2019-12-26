import { ExportBanList } from 'database/models';

export default async (_, args) => {
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
      generated: false
    },
    {
      new: true
    }
  );
};
