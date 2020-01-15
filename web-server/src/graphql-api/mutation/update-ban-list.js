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

  if (args.type === 'battlemetrics') {
    check = await BanList.findOne({
      _id: { $ne: args._id },
      battlemetricsID: args.battlemetricsID
    });
    if (check !== null) throw new Error('Ban List already in database.');
  }

  return BanList.findOneAndUpdate(
    { _id: args._id },
    {
      name: args.name,
      type: args.type,
      organization: args.organization,
      battlemetricsID: args.battlemetricsID
    },
    {
      new: true
    }
  );
};
