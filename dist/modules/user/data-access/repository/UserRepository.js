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
const Group_1 = require("../../../group/data-access/entity/Group");
const User_1 = require("../entitity/User");
class UserRepository {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findByPk(id);
            return user;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.UserModel.findAll({
                include: [Group_1.GroupModel]
            });
            return users;
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.UserModel.create(user);
        });
    }
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.UserModel.update({
                login: user.login,
                password: user.password,
                age: user.age
            }, {
                where: { id: user.id }
            });
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.UserModel.destroy({
                where: { id }
            });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map