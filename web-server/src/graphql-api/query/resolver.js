import { Ban, SteamUser } from 'scbl-lib/db/models';

export default {
  Query: {
    bans: (parent, filter) => {
      return Ban.paginate({
        order: [[filter.orderBy || 'created', filter.orderDirection || 'DESC']],
        first: filter.first,
        after: filter.after,
        last: filter.last,
        before: filter.before
      });
    },
    steamUsers: (parent, filter) => {
      return SteamUser.paginate({
        order: [[filter.orderBy || 'id', filter.orderDirection || 'DESC']],
        first: filter.first,
        after: filter.after,
        last: filter.last,
        before: filter.before
      });
    },
    steamUser: async (parent, filter) => {
      return SteamUser.findByPk(filter.id);
    },
    loggedInSteamUser: async (parent, filter, context) => {
      return context.user ? SteamUser.findByPk(context.user.id) : null;
    }
  }
};
