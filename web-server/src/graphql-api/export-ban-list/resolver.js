import { SteamUser } from 'database/models';

export default {
  ExportBanList: {
    owner: async parent => {
      return SteamUser.findOne({ steamID: parent.owner });
    }
  }
};
