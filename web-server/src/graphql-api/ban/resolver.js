import { BanList, SteamUser } from 'scbl-lib/db/models';

export default {
  Ban: {
    steamUser: (parent) => {
      return SteamUser.findByPk(parent.steamUser);
    },
    banList: (parent) => {
      return BanList.findByPk(parent.banList);
    }
  }
};
