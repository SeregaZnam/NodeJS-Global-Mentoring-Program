"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.User = database_1.sequelize.define('user', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUID
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.UserModel = database_1.sequelize.models.User;
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
//# sourceMappingURL=User.js.map