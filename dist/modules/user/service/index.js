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
const UserRepository_1 = require("../data-access/repository/UserRepository");
const logger_1 = __importDefault(require("../../../logger"));
class UserService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserRepository_1.UserRepository.findAll();
            return users.map((user) => user.get({ plain: true }));
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.UserRepository.getById(id);
            return user ? user.get({ plain: true }) : undefined;
        });
    }
    static getAutoSuggest(loginSubstring, limit = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserRepository_1.UserRepository.findAll();
                const result = users.map((u) => u.get({ plain: true }))
                    .filter((u) => {
                    const user = u.login.toLocaleLowerCase();
                    const substr = loginSubstring.toLocaleLowerCase();
                    return user.includes(substr);
                });
                return result.slice(0, limit);
            }
            catch (err) {
                console.log(err);
                logger_1.default.error('Error get users with suggest', {
                    err,
                    method: 'getAutoSuggest',
                    params: { loginSubstring, limit }
                });
            }
        });
    }
    static save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserRepository_1.UserRepository.create(user);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserRepository_1.UserRepository.update(user);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserRepository_1.UserRepository.destroy(id);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=index.js.map