"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const sequelize_1 = __importDefault(require("sequelize"));
exports.User = database_1.sequelize.define('User', {
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
    tableName: "users"
});
exports.UserModel = database_1.sequelize.models.User;
//# sourceMappingURL=User.js.map