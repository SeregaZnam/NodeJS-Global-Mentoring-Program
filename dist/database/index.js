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
const User_1 = require("../modules/user/data-access/entitity/User");
const Group_1 = require("../modules/group/data-access/entity/Group");
exports.createDbConnect = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { host, database, password, user, port } = config.get('db');
    const sequelize = new sequelize_1.Sequelize(database, user, password, {
        dialect: 'postgres',
        host,
        port,
        dialectOptions: {
            ssl: true
        }
    });
    const transaction = (options) => sequelize.transaction(options);
    yield User_1.initUserModel(sequelize);
    yield Group_1.initGroupModel(sequelize);
    [User_1.UserModel, Group_1.GroupModel].forEach(entity => {
        if (entity.associate) {
            entity.associate();
        }
    });
    return { sequelize, transaction, Sequelize: sequelize_1.Sequelize };
});
//# sourceMappingURL=index.js.map