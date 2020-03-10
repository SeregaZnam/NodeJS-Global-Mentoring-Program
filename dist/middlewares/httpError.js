"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
exports.httpError = (err, req, res, next) => {
    logger_1.default.error('Something went wrong', { err });
    const clientError = {
        message: 'Something went wrong',
        code: 'INTERNAL_ERROR',
        status: 500
    };
    res.status(clientError.status).send({ error: clientError });
};
//# sourceMappingURL=httpError.js.map