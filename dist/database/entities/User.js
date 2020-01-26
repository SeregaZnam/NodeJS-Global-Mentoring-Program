"use strict";
// import { sequelize } from "../database";
// import sequelize, {Model, sequelize} from "sequelize";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const database_1 = require("../database");
const sequelize_1 = __importStar(require("sequelize"));
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    id: {
        type: sequelize_1.default.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.default.UUID
    },
    login: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.default.INTEGER
    }
}, {
    sequelize: database_1.sequelize,
    tableName: "users"
});
exports.userModel = database_1.sequelize.models.UserModel;
//# sourceMappingURL=User.js.map