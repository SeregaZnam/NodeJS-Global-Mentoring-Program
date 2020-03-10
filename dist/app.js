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
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("./configs/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const inversify_express_utils_1 = require("inversify-express-utils");
const httpError_1 = require("./middlewares/httpError");
const loggerHandler_1 = require("./middlewares/loggerHandler");
const inversify_config_1 = require("./inversify.config");
const inversify_1 = require("inversify");
const preloadMockData_1 = require("./utils/preloadMockData");
const auth_1 = require("./auth");
const types_1 = require("./constants/types");
process.on('unhandledRejection', (err) => {
    throw err;
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Server starting bootstrap');
        const container = new inversify_1.Container();
        yield container.loadAsync(inversify_config_1.bindings);
        const server = new inversify_express_utils_1.InversifyExpressServer(container);
        server.setConfig((app) => __awaiter(void 0, void 0, void 0, function* () {
            app.use(cors_1.default());
            app.use(helmet_1.default());
            app.use(body_parser_1.default.json());
            app.use(express_1.default.json());
            app.use(loggerHandler_1.loggerHandler);
            app.use(httpError_1.httpError);
            yield auth_1.initializeStrategies(container.get(types_1.TYPES.UserService));
        }));
        const app = server.build();
        yield preloadMockData_1.preloadMockData();
        app.listen(config_1.default.get('port'), () => {
            logger_1.default.info(`Server is running at ${config_1.default.get('port')}!`);
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