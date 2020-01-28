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
const User_1 = __importDefault(require("../database/entities/User"));
class UserService {
    constructor() {
        this.data = [];
        this.getDataDB();
    }
    getDataDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.findAll();
                this.data = users;
                return users;
            }
            catch (_a) {
                throw new Error('Error receiving data');
            }
        });
    }
    getAll() {
        return this.store();
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.data;
            return users.find((user) => user.id == id.toString());
        });
    }
    getAutoSuggest(loginSubstring, limit = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.data.filter((u) => {
                const user = u.login.toLocaleLowerCase();
                const substr = loginSubstring.toLocaleLowerCase();
                return user.includes(substr);
            });
            return result.slice(0, limit);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.create(user);
                // update this.data
                this.getDataDB();
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.update({
                    login: user.login,
                    password: user.password,
                    age: user.age
                }, {
                    where: { id: user.id }
                });
                // update this.data
                this.getDataDB();
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.destroy({
                    where: { id }
                });
                this.getDataDB();
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    store() {
        return this.data;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map