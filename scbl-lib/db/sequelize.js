import Sequelize from 'sequelize';

if (!process.env.DATABASE_URI)
  throw new Error('Environmental variable DATABASE_URI must be provided.');

export default new Sequelize.Sequelize(process.env.DATABASE_URI, { logging: false });

const { Op } = Sequelize;

export { Op };
