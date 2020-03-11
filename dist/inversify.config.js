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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./configs/config"));
const types_1 = require("./constants/types");
const service_1 = require("./modules/user/service");
const service_2 = require("./modules/group/service");
const service_3 = require("./modules/user-group/service");
const GroupRepository_1 = require("./modules/group/data-access/repository/GroupRepository");
const UserRepository_1 = require("./modules/user/data-access/repository/UserRepository");
const database_1 = require("./database");
const inversify_1 = require("inversify");
const logger_1 = __importDefault(require("./logger"));
const auth_1 = require("./service/auth");
exports.bindings = new inversify_1.AsyncContainerModule((bind) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.resolve().then(() => __importStar(require('./modules/user/controller')));
    yield Promise.resolve().then(() => __importStar(require('./modules/group/controller')));
    yield Promise.resolve().then(() => __importStar(require('./modules/user-group/controller')));
    const dbConnect = yield database_1.createDbConnect(config_1.default);
    yield dbConnect.sequelize.sync({ force: true });
    bind(types_1.TYPES.DbConnect).toConstantValue(dbConnect);
    bind(types_1.TYPES.Logger).toConstantValue(logger_1.default);
    bind(types_1.TYPES.AuthService).to(auth_1.AuthService);
    bind(types_1.TYPES.UserService).to(service_1.UserService);
    bind(types_1.TYPES.GroupService).to(service_2.GroupService);
    bind(types_1.TYPES.UserGroupService).to(service_3.UserGroupService);
    bind(types_1.TYPES.UserRepository).to(UserRepository_1.UserRepository);
    bind(types_1.TYPES.GroupRepository).to(GroupRepository_1.GroupRepository);
}));
//# sourceMappingURL=inversify.config.js.map