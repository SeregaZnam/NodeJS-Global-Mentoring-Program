import { sequelize } from "../database";
import Sequelize from "sequelize";

export const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUID
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER
  }
}, {
  tableName: "users"
});

export const UserModel = sequelize.models.User;