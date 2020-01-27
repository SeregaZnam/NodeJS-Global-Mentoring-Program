import { Sequelize } from "sequelize";
import config from "../config";

const {host, database, password, user, port} = config.get("db");

export const sequelize = new Sequelize(database, user, password, {
  dialect: "postgres",
  host,
  port,
  dialectOptions: {
    ssl: true
  }
});
