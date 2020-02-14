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
class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
        this.UserEntity = this.userModel;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.UserEntity.findAll();
            return users;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.UserEntity.create(user);
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.UserEntity.update({
                login: user.login,
                password: user.password,
                age: user.age
            }, {
                where: { id: user.id }
            });
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.UserEntity.destroy({
                where: { id }
            });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map