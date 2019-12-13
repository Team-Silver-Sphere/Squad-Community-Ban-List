import { Organization } from 'database/models';

export default async (_, args) => {
  let check = await Organization.findOne({ name: args.name });
  if(check !== null) throw new Error('Organization with the same name already exists.');

  const organization = new Organization({ name: args.name });
  await organization.save();
  return organization;
};