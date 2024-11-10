import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodejsltw', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
