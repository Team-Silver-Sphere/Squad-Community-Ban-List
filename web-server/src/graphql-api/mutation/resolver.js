import { BanList, ExportBanList, ExportBanListConfig } from 'scbl-lib/db/models';
import { testDiscordWebhook } from 'scbl-lib/utils';

export default {
  Mutation: {
    createExportBanList: async (parent, args, context) => {
      const count = await ExportBanList.count({ where: { owner: context.user.id } });
      if (count >= 4) throw new Error('You are limited to 4 export ban lists.');

      if (!['remote', 'battlemetrics'].includes(args.type))
        throw new Error('Invalid export ban list type.');

      if (args.discordWebhook) await testDiscordWebhook(args.discordWebhook);

      const exportBanLsit = await ExportBanList.create({
        name: args.name,
        server: args.server,
        type: args.type,
        threshold: args.threshold,
        defaultActivePoints: args.defaultActivePoints,
        defaultExpiredPoints: args.defaultExpiredPoints,
        discordWebhook: args.discordWebhook,
        owner: context.user.id
      });

      if (exportBanLsit.type === 'battlemetrics') await exportBanLsit.createBattlemetricsBanList();

      return exportBanLsit;
    },

    updateExportBanList: async (parent, args, context) => {
      // Get export ban list.
      const exportBanList = await ExportBanList.findOne({
        where: { id: args.id, owner: context.user.id }
      });

      // Check export ban list exists.
      if (!exportBanList) throw new Error('Export ban list does not exist!');

      // Check the supplied webhook works.
      if (args.discordWebhook && args.discordWebhook !== exportBanList.discordWebhook)
        await testDiscordWebhook(args.discordWebhook);

      // Check whether the ban list needs generating.
      if (
        (args.threshold && args.threshold !== exportBanList.threshold) ||
        (args.defaultActivePoints &&
          args.defaultActivePoints !== exportBanList.defaultActivePoints) ||
        (args.defaultExpiredPoints &&
          args.defaultExpiredPoints !== exportBanList.defaultExpiredPoints)
      ) {
        exportBanList.generated = false;
      }

      if (args.name) exportBanList.name = args.name;
      if (args.server) exportBanList.server = args.server;
      if (args.threshold) exportBanList.threshold = args.threshold;
      if (args.defaultActivePoints) exportBanList.defaultActivePoints = args.defaultActivePoints;
      if (args.defaultExpiredPoints) exportBanList.defaultExpiredPoints = args.defaultExpiredPoints;
      if (args.discordWebhook || args.discordWebhook === '')
        exportBanList.discordWebhook = args.discordWebhook;

      await exportBanList.save();

      return exportBanList;
    },

    deleteExportBanList: async (parent, args, context) => {
      const exportBanList = await ExportBanList.findOne({
        where: { id: args.id, owner: context.user.id }
      });

      if (!exportBanList) throw new Error('Export ban list does not exist!');

      if (exportBanList.type === 'battlemetrics') await exportBanList.deleteBattlemetricsBanList();

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
