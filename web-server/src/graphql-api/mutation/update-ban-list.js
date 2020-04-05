import { Organization, BanList } from 'database/models';

export default async (_, args) => {
  let check;

  check = await Organization.findOne({ _id: args.organization });
  if (check === null) throw new Error('Invalid organization ID.');

  check = await BanList.findOne({
    _id: { $ne: args._id },
    name: args.name,
    organization: args.organization
  });
  if (check !== null)
    throw new Error(
      'This organization already has a ban list with the same name.'
    );

  check = await BanList.findOne({
    _id: { $ne: args._id },
    source: args.source
  });
  if (check !== null) throw new Error('Ban List already in database.');

  return BanList.findOneAndUpdate(
    { _id: args._id },
    {
      name: args.name,
      type: args.type,
      source: args.source,
      organization: args.organization
    },
    {
      new: true
    }
  );
};
