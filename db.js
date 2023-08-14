import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";
configDotenv();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_OWNER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

export default sequelize;
