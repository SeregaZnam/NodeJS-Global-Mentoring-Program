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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const database_1 = require("./database");
const User_1 = require("./modules/user/data-access/entitity/User");
const Group_1 = require("./modules/group/data-access/entity/Group");
const httpError_1 = require("./middleware/httpError");
const routes_1 = require("./routes");
const loggerHandler_1 = require("./middleware/loggerHandler");
process.on('unhandledRejection', (err) => {
    throw err;
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Server starting bootstrap');
        const app = express_1.default();
        const db = yield database_1.createDbConnect(config_1.default);
        app.use(express_1.default.json());
        app.use(loggerHandler_1.loggerHandler);
        app.use(httpError_1.httpError);
        routes_1.attachRoutes(app);
        db.sequelize.sync({ force: true })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const pathUserSeed = path_1.default.resolve(__dirname, 'database', 'seeds', 'users.json');
            const pathGroupSeed = path_1.default.resolve(__dirname, 'database', 'seeds', 'groups.json');
            const users = yield fs_1.default.promises.readFile(pathUserSeed, { encoding: 'utf-8' });
            const group = yield fs_1.default.promises.readFile(pathGroupSeed, { encoding: 'utf-8' });
            User_1.UserModel.bulkCreate(JSON.parse(users));
            Group_1.GroupModel.bulkCreate(JSON.parse(group));
        }))
            .then(() => {
            app.listen(config_1.default.get('port'), () => {
                console.log(`Server is running at ${config_1.default.get('port')}!`);
            });
        });
    }
    catch (err) {
        logger_1.default.error('can not bootstrap server', { err });
        throw err;
    }
});
bootstrap().catch(() => {
    process.exit(1);
});
//# sourceMappingURL=app.js.map