import { BanList } from 'scbl-lib/db/models';

export default {
  Organisation: {
    banLists: (parent) => {
      return BanList.findAll({
        where: { organisation: parent.id },
        order: [['name', 'ASC']]
      });
    }
  }
};
