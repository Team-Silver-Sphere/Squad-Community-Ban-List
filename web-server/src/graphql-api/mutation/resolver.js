import { ExportBanList } from 'scbl-lib/db/models';

export default {
  Mutation: {
    createExportBanList: (parent, args, context) => {
      return ExportBanList.create({
        name: args.name,
        server: args.server,
        threshold: args.threshold,
        defaultActivePoints: args.defaultActivePoints,
        defaultExpiredPoints: args.defaultExpiredPoints,
        owner: context.user.id
      });
    },

    updateExportBanList: async (parent, args, context) => {
      const exportBanList = await ExportBanList.findByPk(args.id);

      if (!exportBanList) throw new Error('Export ban list does not exist!');
      if (exportBanList.owner !== context.user.id)
        throw new Error('You do not have permission to do this!');

      exportBanList.name = args.name;
      exportBanList.server = args.server;
      exportBanList.threshold = args.threshold;
      exportBanList.defaultActivePoints = args.defaultActivePoints;
      exportBanList.defaultExpiredPoints = args.defaultExpiredPoints;

      await exportBanList.save();

      return exportBanList;
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
