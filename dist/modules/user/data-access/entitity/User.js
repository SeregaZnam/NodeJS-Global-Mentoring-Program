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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Group_1 = require("../../../group/data-access/entity/Group");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.associate = () => {
    UserModel.associations.groups = UserModel.belongsToMany(Group_1.GroupModel, {
        through: 'user-group'
    });
};
exports.initUserModel = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    UserModel.init({
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
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    return UserModel;
});
//# sourceMappingURL=User.js.map