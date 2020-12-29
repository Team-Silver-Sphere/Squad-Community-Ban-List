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
      type: DataTypes.DATE(6),
      notNull: true
    },
    expires: {
      type: DataTypes.DATE(6)
    },
    expired: {
      type: DataTypes.BOOLEAN,
      notNull: true
    },
    reason: {
      type: DataTypes.TEXT,
      notNull: true
    },
    rawReason: {
      type: DataTypes.TEXT
    }
  })
);
