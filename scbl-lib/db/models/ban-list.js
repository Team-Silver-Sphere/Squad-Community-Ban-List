import Sequelize from 'sequelize';

import sequelize from '../sequelize.js';

const { DataTypes } = Sequelize;

export default sequelize.define('BanList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  source: {
    type: DataTypes.TEXT
  }
});
