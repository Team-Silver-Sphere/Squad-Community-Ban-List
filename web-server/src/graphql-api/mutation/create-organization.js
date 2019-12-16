import { Organization } from 'database/models';

export default async (_, args) => {
  const check = await Organization.findOne({ name: args.name });
  if (check !== null)
    throw new Error('Organization with the same name already exists.');

  const organization = new Organization({
    name: args.name,
    contact: args.contact,
    appeal: args.appeal
  });
  await organization.save();
  return organization;
};
