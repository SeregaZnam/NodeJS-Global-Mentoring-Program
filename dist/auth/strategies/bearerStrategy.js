"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = __importDefault(require("passport-http-bearer"));
const BearerStrategy = passport_http_bearer_1.default.Strategy;
exports.initBearerStrategy = () => {
    passport_1.default.use('bearer', new BearerStrategy((token, done) => {
        // TODO
        return done(null, { user: '' }, { scope: 'all', message: '' });
    }));
};
//# sourceMappingURL=bearerStrategy.js.map