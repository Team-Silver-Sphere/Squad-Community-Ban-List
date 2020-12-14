import { Organisation } from 'scbl-lib/db/models';

export default {
  BanList: {
    organisation: (parent) => {
      return Organisation.findByPk(parent.organisation);
    }
  }
};
