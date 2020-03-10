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
const passport_custom_1 = __importDefault(require("passport-custom"));
const AuthStrategy = passport_custom_1.default.Strategy;
exports.initAuthStrategy = (userService) => {
    passport_1.default.use('auth', new AuthStrategy((req, done) => __awaiter(void 0, void 0, void 0, function* () {
        // const user = await userService.getAll({ query: req.body });
        // if (user) {
        //    done(null, user);
        // } else {
        //    throw new NotFoundError('User not found');
        // }
    })));
};
//# sourceMappingURL=authStrategy.js.map