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
Object.defineProperty(exports, "__esModule", { value: true });
const authStrategy_1 = require("./strategies/authStrategy");
const bearerStrategy_1 = require("./strategies/bearerStrategy");
exports.initializeStrategies = (userService, authService) => __awaiter(void 0, void 0, void 0, function* () {
    yield authStrategy_1.initAuthStrategy(userService);
    yield bearerStrategy_1.initBearerStrategy(authService);
});
//# sourceMappingURL=index.js.map