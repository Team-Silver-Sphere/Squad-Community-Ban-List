import Sequelize from 'sequelize';

import sequelize from '../sequelize.js';

const { DataTypes } = Sequelize;

class ExportBanList extends Sequelize.Model {}

ExportBanList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    server: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    threshold: {
      type: DataTypes.INTEGER,
      default: 9
    },
    defaultActivePoints: {
      type: DataTypes.INTEGER,
      default: 3
    },
    defaultExpiredPoints: {
      type: DataTypes.INTEGER,
      default: 1
    }
  },
  { sequelize }
);

export default ExportBanList;
