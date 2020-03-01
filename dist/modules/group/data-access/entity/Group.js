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
const User_1 = require("../../../user/data-access/entitity/User");
class GroupModel extends sequelize_1.Model {
}
exports.GroupModel = GroupModel;
GroupModel.associate = () => {
    GroupModel.associations.users = GroupModel.belongsToMany(User_1.UserModel, {
        through: 'user-group'
    });
};
exports.initGroupModel = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    GroupModel.init({
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
        sequelize,
        tableName: 'groups',
        timestamps: false
    });
    return GroupModel;
});
//# sourceMappingURL=Group.js.map