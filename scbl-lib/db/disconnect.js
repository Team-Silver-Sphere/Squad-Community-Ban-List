import sequelize from './sequelize.js';

export default async function () {
  await sequelize.close();
}
