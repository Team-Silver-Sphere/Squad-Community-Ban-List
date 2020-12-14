import { Ban, ExportBanList } from 'scbl-lib/db/models';

export default {
  SteamUser: {
    bans: (parent, filter) => {
      return Ban.paginate({
        order: [[filter.orderBy || 'created', filter.orderDirection || 'DESC']],
        first: filter.first,
        after: filter.after,
        last: filter.last,
        before: filter.before,
        where: {
          steamUser: parent.id,
          ...(typeof filter.expired !== 'undefined' && { expired: filter.expired })
        }
      });
    },
    exportBanLists: (parent) => {
      return ExportBanList.findAll({ where: { owner: parent.id } });
    }
  }
};
