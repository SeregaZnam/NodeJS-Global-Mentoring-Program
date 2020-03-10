"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../configs/config"));
const logger = winston_1.default.createLogger({
    level: config_1.default.get('env') === 'production' ? 'info' : 'debug',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: './logs/info.log', level: 'info' }),
        new winston_1.default.transports.File({ filename: './logs/warn.log', level: 'warn' }),
        new winston_1.default.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: './logs/combined.log' })
    ]
});
if (config_1.default.get('logging_level') !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
exports.default = logger;
//# sourceMappingURL=index.js.map