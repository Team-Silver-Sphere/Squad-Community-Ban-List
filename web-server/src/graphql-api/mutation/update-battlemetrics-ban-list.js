import { Organization, BattleMetricsBanList } from 'database/models';

export default async (_, args) => {
  let check;

  check = await Organization.findOne({ _id: args.organization });
  if (check === null) throw new Error('Invalid organization ID.');

  check = await BattleMetricsBanList.findOne({
    _id: { $ne: args._id },
    id: args.id
  });
  if (check !== null) throw new Error('Ban List already in database.');

  check = await BattleMetricsBanList.findOne({
    _id: { $ne: args._id },
    name: args.name,
    organization: args.organization
  });
  if (check !== null)
    throw new Error(
      'This organization already has a ban list with the same name.'
    );

  return BattleMetricsBanList.findOneAndUpdate(
    { _id: args._id },
    {
      id: args.id,
      name: args.name,
      organization: args.organization
    },
    {
      new: true
    }
  );
};
