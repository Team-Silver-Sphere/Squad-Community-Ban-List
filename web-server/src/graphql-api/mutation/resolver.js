import { BanList, ExportBanList, ExportBanListConfig } from 'scbl-lib/db/models';
import { testDiscordWebhook } from 'scbl-lib/utils';

export default {
  Mutation: {
    createExportBanList: async (parent, args, context) => {
      // Ensure user does not exceed max export ban list amount.
      const count = await ExportBanList.count({ where: { owner: context.user.id } });
      if (count >= 4) throw new Error('You are limited to 4 export ban lists.');

      // Validate arguments.
      if (!['remote', 'battlemetrics'].includes(args.type)) throw new Error('Invalid export ban list type.');
      if (args.maxBanAge !== undefined && args.maxBanAge < 0) throw new Error('The max ban age must be a positive integer or zero.');
      if (args.discordWebhook) await testDiscordWebhook(args.discordWebhook);

      // Create export ban list.
      const exportBanLsit = await ExportBanList.create({
        name: args.name,
        server: args.server,
        type: args.type,
        threshold: args.threshold,
        defaultActivePoints: args.defaultActivePoints,
        defaultExpiredPoints: args.defaultExpiredPoints,
        maxBanAge: args.maxBanAge,
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

      // Validate arguments.
      if (args.maxBanAge !== undefined && args.maxBanAge < 0) throw new Error('The max ban age must be a positive integer or zero.');
      if (args.discordWebhook && args.discordWebhook !== exportBanList.discordWebhook) await testDiscordWebhook(args.discordWebhook);

      // Check whether the ban list needs generating.
      if (
        ('threshold' in args && args.threshold !== exportBanList.threshold) ||
        ('defaultActivePoints' in args && args.defaultActivePoints !== exportBanList.defaultActivePoints) ||
        ('defaultExpiredPoints' in args && args.defaultExpiredPoints !== exportBanList.defaultExpiredPoints) ||
        ('maxBanAge' in args && args.maxBanAge !== exportBanList.maxBanAge)
      ) {
        exportBanList.generated = false;
      }

      // Update arguments if specified
      if ('name' in args) exportBanList.name = args.name;
      if ('server' in args) exportBanList.server = args.server;
      if ('threshold' in args) exportBanList.threshold = args.threshold;
      if ('defaultActivePoints' in args) exportBanList.defaultActivePoints = args.defaultActivePoints;
      if ('defaultExpiredPoints' in args) exportBanList.defaultExpiredPoints = args.defaultExpiredPoints;
      if ('maxBanAge' in args) exportBanList.maxBanAge = args.maxBanAge;
      if ('discordWebhook' in args) exportBanList.discordWebhook = args.discordWebhook;

      await exportBanList.save();

      return exportBanList;
    },

    deleteExportBanList: async (parent, args, context) => {
      // Get the export ban list.
      const exportBanList = await ExportBanList.findOne({
        where: { id: args.id, owner: context.user.id }
      });

      // Check the export ban list exists.
      if (!exportBanList) throw new Error('Export ban list does not exist!');

      // Delete the export ban list.
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
