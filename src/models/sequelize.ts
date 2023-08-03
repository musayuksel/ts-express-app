import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DB_DB = process.env.DB_DB;
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_DB || !DB_HOST || !DB_USERNAME || !DB_PASSWORD) {
  throw new Error('Missing required environment variables for database connection.');
}

const sequelize = new Sequelize(DB_DB, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

const testDbConnection = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to ${sequelize.getDatabaseName()} postgres database`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await sequelize.sync({ alter: true }); //TODO: delete it in production
  return sequelize;
};

export { sequelize, testDbConnection };
