import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL || "postgres://localhost:5432/slack";

const sequelize = new Sequelize(DB_URL);

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
