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

  return ExportBanList.create({
    name: args.name,
    config: args.config,
    owner: context.user,
    generatorStatus: 'queued',
    battlemetricsStatus: args.battlemetricsEnabled ? 'queued' : 'disabled'
  });
};
