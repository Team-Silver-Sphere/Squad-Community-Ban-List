import Sequelize from 'sequelize';

import sequelize from '../sequelize.js';

const { DataTypes } = Sequelize;

export default sequelize.define('ExportBanListConfig', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  activePoints: {
    type: DataTypes.INTEGER,
    notNull: true
  },
  expiredPoints: {
    type: DataTypes.INTEGER,
    notNull: true
  }
});
