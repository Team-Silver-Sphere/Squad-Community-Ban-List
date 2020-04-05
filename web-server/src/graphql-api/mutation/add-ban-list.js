import { BanList, Organization } from 'database/models';

export default async (_, args) => {
  let check;

  check = await Organization.findOne({ _id: args.organization });
  if (check === null) throw new Error('Invalid organization ID.');

  check = await BanList.findOne({
    name: args.name,
    organization: args.organization
  });
  if (check !== null)
    throw new Error(
      'This organization already has a ban list with the same name.'
    );

  check = await BanList.findOne({ source: args.source });
  if (check !== null) throw new Error('Ban List already in database.');

  const banList = new BanList({
    name: args.name,
    type: args.type,
    source: args.source,
    organization: args.organization
  });
  await banList.save();
  return banList;
};
