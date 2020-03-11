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
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = __importDefault(require("passport-http-bearer"));
const BearerStrategy = passport_http_bearer_1.default.Strategy;
exports.initBearerStrategy = (authService) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.use('bearer', new BearerStrategy((token, done) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authService.verifyToken(token);
        return done(null, result, { scope: 'all' });
    })));
});
//# sourceMappingURL=bearerStrategy.js.map