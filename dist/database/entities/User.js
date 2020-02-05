"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
database_1.sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
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
}, {
    tableName: "users",
    timestamps: false
});
database_1.sequelize.define('Group', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false
    }
}, {
    tableName: "groups",
    timestamps: false
});
database_1.sequelize.define('UserGroup', {
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    groupId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Group',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }
}, {
    tableName: "usergroup",
    timestamps: false
});
database_1.sequelize.models.Group.belongsToMany(database_1.sequelize.models.User, {
    through: database_1.sequelize.models.UserGroup,
    as: 'groups',
    foreignKey: 'groupId',
    otherKey: 'userId'
});
database_1.sequelize.models.User.belongsToMany(database_1.sequelize.models.Group, {
    through: database_1.sequelize.models.UserGroup,
    as: 'users',
    foreignKey: 'userId',
    otherKey: 'groupId'
});
database_1.sequelize.models.UserGroup.belongsTo(database_1.sequelize.models.User, {
    as: 'users',
    foreignKey: 'userId',
    targetKey: 'id'
});
database_1.sequelize.models.UserGroup.belongsTo(database_1.sequelize.models.Group, {
    as: 'groups',
    foreignKey: 'groupId',
    targetKey: 'id'
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.sync({ force: true });
    // const users = fs.readFileSync(path.join(__dirname, '../', 'users.json'), {encoding: "utf-8"});
    // await sequelize.models.User.bulkCreate(JSON.parse(users));
    // const groups = fs.readFileSync(path.join(__dirname, '../', 'groups.json'), {encoding: "utf-8"});
    // await sequelize.models.Group.bulkCreate(JSON.parse(groups));
    database_1.sequelize.models.Group.create({
        name: "Group1",
        permissions: ["READ"]
    });
    const users = fs_1.default.readFileSync(path_1.default.join(__dirname, '../', 'users.json'), { encoding: "utf-8" });
    const usersDB = yield database_1.sequelize.models.User.bulkCreate(JSON.parse(users));
    console.log(database_1.sequelize.models);
}))();
exports.default = database_1.sequelize.models.User;
//# sourceMappingURL=User.js.map