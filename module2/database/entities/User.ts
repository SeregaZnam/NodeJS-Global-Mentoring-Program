import {DataTypes} from "sequelize";
import {sequelize} from "../database";

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUID
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
});

export const UserModel = sequelize.models.User;

// import {sequelize} from "../database";
// import Sequelize, {Model} from "sequelize";
//
// class UserModel extends Model {}
//
// UserModel.init({
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
//   sequelize
// });
//
// export const userModel = sequelize.models.UserModel;