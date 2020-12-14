import { ExportBanList } from 'scbl-lib/db/models';

export default {
  Mutation: {
    createExportBanList: (parent, args, context) => {
      return ExportBanList.create({
        name: args.name,
        server: args.server,
        defaultActiveWeight: args.defaultActiveWeight,
        defaultExpiredWeight: args.defaultExpiredWeight,
        owner: context.user.id
      });
    },

    deleteExportBanList: async (parent, args, context) => {
      const exportBanList = await ExportBanList.findByPk(args.id);

      if (!exportBanList) throw new Error('Export ban list does not exist!');
      if (exportBanList.owner !== context.user.id)
        throw new Error('You do not have permission to do this!');

      await exportBanList.destroy();
      return exportBanList;
    }
  }
};
