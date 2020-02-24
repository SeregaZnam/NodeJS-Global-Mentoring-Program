"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
exports.loggerHandler = (req, res, next) => {
    logger_1.default.info('Handle request method', { method: req.method });
    next();
};
//# sourceMappingURL=loggerHandler.js.map