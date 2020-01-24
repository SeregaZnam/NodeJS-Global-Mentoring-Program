"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const types_1 = require("sequelize/types");
exports.User = database_1.sequelize.define('User', {
    id: {
        type: types_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: types_1.DataTypes.UUIDV4
    },
    login: {
        type: types_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: types_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: types_1.DataTypes.INTEGER
    }
}, {
    tableName: "users"
});
//# sourceMappingURL=User.js.map