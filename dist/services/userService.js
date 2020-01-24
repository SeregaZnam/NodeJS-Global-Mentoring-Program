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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
class UserService {
    constructor() {
        this.data = [];
        this.getDataDB();
    }
    getDataDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const pathData = path_1.default.resolve(__dirname, '../', 'database', 'users.json');
            const readFile = util_1.default.promisify(fs_1.default.readFile);
            try {
                const jsonData = yield readFile(pathData, { encoding: 'utf-8' });
                this.data = JSON.parse(jsonData);
                return JSON.parse(jsonData);
            }
            catch (_a) {
                throw new Error('Error receiving data');
            }
        });
    }
    getAll() {
        return this.data;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.data;
            return users.find((user) => user.id == id.toString());
        });
    }
    getAutoSuggest(loginSubstring, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.data;
            const result = users.filter((u) => {
                return u.login.includes(loginSubstring);
            });
            return result.slice(0, limit);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.data;
            users.push(user);
            this.data = users;
            try {
                const pathData = path_1.default.resolve(__dirname, '../', 'database', 'users.json');
                const writeFile = util_1.default.promisify(fs_1.default.writeFile);
                writeFile(pathData, JSON.stringify(users, null, '\t'));
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.data;
            const index = users.findIndex((u) => u.id == user.id);
            users[index] = user;
            this.data = users;
            try {
                const pathData = path_1.default.resolve(__dirname, '../', 'database', 'users.json');
                const writeFile = util_1.default.promisify(fs_1.default.writeFile);
                writeFile(pathData, JSON.stringify(users, null, '\t'));
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.data;
            const index = users.findIndex((u) => u.id == id);
            this.data = users;
            try {
                const pathData = path_1.default.resolve(__dirname, '../', 'database', 'users.json');
                const writeFile = util_1.default.promisify(fs_1.default.writeFile);
                writeFile(pathData, JSON.stringify(users, null, '\t'));
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