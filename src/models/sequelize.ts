import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_DB = process.env.DB_DB || 'slack';
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_DB, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const testDbConnection = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to ${sequelize.getDatabaseName()} postgres database`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await sequelize.sync({ force: true });
  return sequelize;
};

export { sequelize, testDbConnection };
