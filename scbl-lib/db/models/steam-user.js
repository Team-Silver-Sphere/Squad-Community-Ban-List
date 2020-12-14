import Sequelize from 'sequelize';
import SequelizeCursorPagination from '@thomas-smyth/sequelize-cursor-pagination';

import { sequelize } from '../index.js';

const { DataTypes } = Sequelize;

const { withRelayPagination } = SequelizeCursorPagination;

export default withRelayPagination({ primaryKeyField: 'id' })(
  sequelize.define('SteamUser', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    profileURL: {
      type: DataTypes.TEXT
    },
    avatar: {
      type: DataTypes.TEXT
    },
    avatarMedium: {
      type: DataTypes.TEXT
    },
    avatarFull: {
      type: DataTypes.TEXT
    },
    lastRefreshedInfo: {
      type: DataTypes.DATE,
      default: null
    },
    isSCBLUser: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    reputationPoints: {
      type: DataTypes.INTEGER,
      default: 0
    },
    lastRefreshedReputationPoints: {
      type: DataTypes.DATE,
      default: null
    },
    reputationRank: {
      type: DataTypes.INTEGER
    },
    lastRefreshedReputationRank: {
      type: DataTypes.DATE,
      default: null
    },
    lastRefreshedExport: {
      type: DataTypes.DATE,
      default: null
    }
  })
);
