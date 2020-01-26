// import { sequelize } from "../database";
// import sequelize, {Model, sequelize} from "sequelize";

// export const User = sequelize.define('User', {
//   id: {
//     type: Sequelize.UUID,
//     allowNull: false,
//     primaryKey: true,
//     defaultValue: Sequelize.UUID
//   },
//   login: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   age: {
//     type: Sequelize.INTEGER
//   }
// }, {
//   tableName: "users"
// });
//
// export const UserModel = sequelize.models.User;

import {sequelize} from "../database";
import Sequelize, {Model} from "sequelize";

class UserModel extends Model {}

UserModel.init({
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
  sequelize,
  tableName: "users"
});

export const userModel = sequelize.models.UserModel;