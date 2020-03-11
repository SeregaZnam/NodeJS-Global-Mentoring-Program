"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errors_1 = require("../constants/errors");
class CustomError extends Error {
    constructor(message, code = 'INTERNAL_ERROR', status = 500, data = {}) {
        super();
        this.message = message;
        this.code = code;
        this.status = status;
        this.data = data;
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, errors_1.ERROR_CODES.NOT_FOUND, http_status_codes_1.default.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class CreateError extends CustomError {
    constructor(message) {
        super(message, errors_1.ERROR_CODES.BAD_REQUEST, http_status_codes_1.default.BAD_REQUEST);
    }
}
exports.CreateError = CreateError;
class UpdateError extends CustomError {
    constructor(message) {
        super(message, errors_1.ERROR_CODES.BAD_REQUEST, http_status_codes_1.default.BAD_REQUEST);
    }
}
exports.UpdateError = UpdateError;
class DeleteError extends CustomError {
    constructor(message) {
        super(message, errors_1.ERROR_CODES.NOT_FOUND, http_status_codes_1.default.NOT_FOUND);
    }
}
exports.DeleteError = DeleteError;
class ValidationError extends CustomError {
    constructor(error, body) {
        super(error.message, errors_1.ERROR_CODES.BAD_REQUEST, http_status_codes_1.default.BAD_REQUEST, body);
    }
}
exports.ValidationError = ValidationError;
class InvalidTokenError extends CustomError {
    constructor(token) {
        super(`Invalid token ${token}`, errors_1.ERROR_CODES.INVALID_TOKEN, http_status_codes_1.default.BAD_REQUEST);
    }
}
exports.InvalidTokenError = InvalidTokenError;
class GetTokenError extends CustomError {
    constructor(error) {
        super(error.message, errors_1.ERROR_CODES.GET_TOKEN, http_status_codes_1.default.BAD_REQUEST);
    }
}
exports.GetTokenError = GetTokenError;
//# sourceMappingURL=index.js.map