"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const inversify_1 = require("inversify");
const types_1 = require("../../../constants/types");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findAll({ query });
            return users.map((user) => user.get({ plain: true }));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(id);
            return user ? user.get({ plain: true }) : undefined;
        });
    }
    getAutoSuggest(loginSubstring, limit = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.findAll({ loginSubstring, limit });
                return users.map((user) => user.get({ plain: true }));
            }
            catch (err) {
                logger_1.default.error('Error get users with suggest', {
                    err,
                    method: 'getAutoSuggest',
                    params: { loginSubstring, limit }
                });
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.userRepository.create(user);
            return createdUser.get({ plain: true });
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userRepository.update(user);
            return updatedUser.get({ plain: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.destroy(id);
            return true;
        });
    }
};
UserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=index.js.map