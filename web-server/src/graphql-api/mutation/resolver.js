import { BanList, ExportBanList, ExportBanListConfig } from 'scbl-lib/db/models';

export default {
  Mutation: {
    createExportBanList: async (parent, args, context) => {
      const count = await ExportBanList.count({ where: { owner: context.user.id } });
      if (count >= 4) throw new Error('You are limited to 4 export ban lists.');

      if(!['remote', 'battlemetrics'].includes(args.type)) throw new Error('Invalid export ban list type.');

      return ExportBanList.create({
        name: args.name,
        server: args.server,
        type: args.type,
        threshold: args.threshold,
        defaultActivePoints: args.defaultActivePoints,
        defaultExpiredPoints: args.defaultExpiredPoints,
        owner: context.user.id
      });
    },

    updateExportBanList: async (parent, args, context) => {
      const exportBanList = await ExportBanList.findOne({
        where: { id: args.id, owner: context.user.id }
      });

      if (!exportBanList) throw new Error('Export ban list does not exist!');

      if(!['remote', 'battlemetrics'].includes(args.type)) throw new Error('Invalid export ban list type.');

      exportBanList.name = args.name;
      exportBanList.server = args.server;
      exportBanList.type = args.type;
      exportBanList.threshold = args.threshold;
      exportBanList.defaultActivePoints = args.defaultActivePoints;
      exportBanList.defaultExpiredPoints = args.defaultExpiredPoints;

      await exportBanList.save();

      return exportBanList;
    },

    deleteExportBanList: async (parent, args, context) => {
      const exportBanList = await ExportBanList.findOne({
        where: { id: args.id, owner: context.user.id }
      });

      if (!exportBanList) throw new Error('Export ban list does not exist!');

      await exportBanList.destroy();
      return exportBanList;
    },

    createExportBanListConfig: async (parent, args, context) => {
      const exportBanList = await ExportBanList.findOne({
        where: { id: args.exportBanList, owner: context.user.id }
      });

      if (!exportBanList) throw new Error('Export ban list does not exist!');

      const banList = await BanList.findOne({
        where: { id: args.banList }
      });

      if (!banList) throw new Error('Ban list does not exist!');

      const exportBanListConfig = await ExportBanListConfig.findOne({
        where: { exportBanList: args.exportBanList, banList: args.banList }
      });

      if (exportBanListConfig)
        throw new Error('Export ban list config already exists for this ban list.');

      return ExportBanListConfig.create({
        exportBanList: args.exportBanList,
        banList: args.banList,
        activePoints: args.activePoints,
        expiredPoints: args.expiredPoints
      });
    },

    deleteExportBanListConfig: async (parent, args, context) => {
      const exportBanListConfig = await ExportBanListConfig.findOne({
        where: { id: args.id, '$ExportBanList.owner$': context.user.id },
        include: [ExportBanList]
      });

      if (!exportBanListConfig) throw new Error('Export ban list config does not exist!');

      await exportBanListConfig.destroy();
      return exportBanListConfig;
    }
  }
};
