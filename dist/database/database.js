"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const { host, database, password, user, port } = config_1.default.get("db");
exports.sequelize = new sequelize_1.Sequelize(database, user, password, {
    dialect: "postgres",
    host,
    port,
    dialectOptions: {
        ssl: true
    }
});
//# sourceMappingURL=database.js.map