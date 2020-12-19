import Sequelize from 'sequelize';
import SequelizeCursorPagination from '@thomas-smyth/sequelize-cursor-pagination';

import { sequelize } from '../index.js';

const { withRelayPagination } = SequelizeCursorPagination;

const { DataTypes } = Sequelize;

export default withRelayPagination({ primaryKeyField: 'id' })(
  sequelize.define('Ban', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    created: {
      type: DataTypes.DATE,
      notNull: true
    },
    expires: {
      type: DataTypes.DATE
    },
    expired: {
      type: DataTypes.BOOLEAN,
      notNull: true
    },
    reason: {
      type: DataTypes.TEXT,
      notNull: true
    }
  })
);