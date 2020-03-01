"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./modules/user/routes"));
const routes_2 = __importDefault(require("./modules/group/routes"));
const routes_3 = __importDefault(require("./modules/user-group/routes"));
exports.attachRoutes = (app) => {
    app.use('/user', routes_1.default);
    app.use('/group', routes_2.default);
    app.use('/user-group', routes_3.default);
};
//# sourceMappingURL=routes.js.map