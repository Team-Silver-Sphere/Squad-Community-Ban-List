import { Ban, ExportBanList } from 'scbl-lib/db/models';

import { calculateRiskRating } from 'scbl-lib/utils';

export default {
  SteamUser: {
    riskRating: (parent) => {
      return calculateRiskRating(parent.reputationPoints);
    },
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
    exportBanList: (parent, filter) => {
      return ExportBanList.findByPk(filter.id);
    },
    exportBanLists: (parent) => {
      return ExportBanList.findAll({ where: { owner: parent.id } });
    }
  }
};
