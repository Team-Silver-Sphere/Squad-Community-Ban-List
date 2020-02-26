import { Organization } from 'database/models';

export default async (_, args) => {
  const check = await Organization.findOne({
    _id: { $ne: args._id },
    name: args.name
  });
  if (check !== null)
    throw new Error('Organization with the same name already exists.');

  return Organization.findOneAndUpdate(
    { _id: args._id },
    {
      name: args.name,
      contact: args.contact,
      appeal: args.appeal,
      official: args.official
    },
    {
      new: true
    }
  );
};
