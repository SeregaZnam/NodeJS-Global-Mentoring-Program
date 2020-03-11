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
const passport_1 = __importDefault(require("passport"));
const service_1 = require("../service");
const UserMapper_1 = require("../utils/mappers/UserMapper");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../../../constants/types");
const errors_1 = require("../../../errors");
const executionTime_1 = require("../../../utils/executionTime");
const validate_1 = require("../../../utils/validate");
const userSchemas_1 = require("../schemas/userSchemas");
const auth_1 = require("../../../service/auth");
let UserController = class UserController extends inversify_express_utils_1.BaseHttpController {
    constructor(logger, userService, authService) {
        super();
        this.logger = logger;
        this.userService = userService;
        this.authService = authService;
    }
    signInUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.authService.signToken(req.body);
            return this.json(token);
        });
    }
    getAutoSuggestUsers(loginSubstring, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAutoSuggest(loginSubstring, limit);
                return this.json((users || []).map((u) => UserMapper_1.UserMapper.toDTO(u)));
            }
            catch (err) {
                this.logger.error('Error get users with suggest', {
                    err,
                    method: 'getAutoSuggestUsers',
                    params: { loginSubstring, limit }
                });
                throw new errors_1.NotFoundError('Error getting users');
            }
        });
    }
    createUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield validate_1.validateBody(userSchemas_1.UserSchema, req.body);
                const user = {
                    login: value.login,
                    password: value.password,
                    age: value.age
                };
                const createdUser = yield this.userService.save(user);
                return this.json(UserMapper_1.UserMapper.toDTO(createdUser));
            }
            catch (err) {
                this.logger.error('Error create request', {
                    method: 'createUser',
                    params: {
                        login: req.body.login,
                        password: req.body.password,
                        age: req.body.age
                    }
                });
                throw new errors_1.CreateError('Error create user');
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getById(id);
                if (user) {
                    return this.json(UserMapper_1.UserMapper.toDTO(user));
                }
            }
            catch (_a) {
                this.logger.error('Error getting user', {
                    method: 'getUser',
                    params: { id }
                });
                throw new errors_1.NotFoundError('Error getting user');
            }
        });
    }
    updateUser(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getById(id);
            if (!user) {
                throw new errors_1.NotFoundError('Error getting user');
            }
            try {
                const value = yield validate_1.validateBody(userSchemas_1.UserSchema, body);
                user.login = value.login;
                user.password = value.password;
                user.age = value.age;
                const updatedUser = yield this.userService.update(user);
                return this.json(UserMapper_1.UserMapper.toDTO(updatedUser));
            }
            catch (_a) {
                this.logger.error('Error updating user', {
                    method: 'updateUser',
                    params: { id }
                });
                throw new errors_1.UpdateError('Error update user');
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getById(id);
                if (user) {
                    yield this.userService.delete(user.id);
                    return this.json(true);
                }
            }
            catch (_a) {
                this.logger.error('Error deleting user', {
                    method: 'deleteUser',
                    params: { id }
                });
                throw new errors_1.DeleteError('Error deleting user');
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/login', passport_1.default.authenticate('auth', { session: false })),
    __param(0, inversify_express_utils_1.request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signInUser", null);
__decorate([
    inversify_express_utils_1.httpGet('', passport_1.default.authenticate('bearer', { session: false })),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestParam('loginSubstring')),
    __param(1, inversify_express_utils_1.requestParam('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAutoSuggestUsers", null);
__decorate([
    inversify_express_utils_1.httpPut(''),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    inversify_express_utils_1.httpGet('/:id'),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    inversify_express_utils_1.httpPost('/:id'),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestBody()),
    __param(1, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:id'),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    inversify_express_utils_1.controller('/user'),
    __param(0, inversify_1.inject(types_1.TYPES.Logger)),
    __param(1, inversify_1.inject(types_1.TYPES.UserService)),
    __param(2, inversify_1.inject(types_1.TYPES.AuthService)),
    __metadata("design:paramtypes", [Object, service_1.UserService,
        auth_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=index.js.map