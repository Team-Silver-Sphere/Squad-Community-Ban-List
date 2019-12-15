import { BattleMetricsBanList, Organization } from 'database/models';

export default async (_, args) => {
  let check;

  check = await Organization.findOne({ _id: args.organization });
  if (check === null) throw new Error('Invalid organization ID.');

  check = await BattleMetricsBanList.findOne({ id: args.id });
  if (check !== null) throw new Error('Ban List already in database.');

  const battlemetricsBanList = new BattleMetricsBanList({
    id: args.id,
    name: args.name,
    organization: args.organization
  });
  await battlemetricsBanList.save();
  return battlemetricsBanList;
};
