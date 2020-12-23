import Sequelize from 'sequelize';

import sequelize from '../sequelize.js';

const { DataTypes } = Sequelize;

export default sequelize.define('ExportBan', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  status: {
    type: DataTypes.ENUM('TO_BE_CREATED', 'CREATED', 'TO_BE_DELETED'),
    notNull: true,
    default: 'TO_BE_CREATED'
  }
});
