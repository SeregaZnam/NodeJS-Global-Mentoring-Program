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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = require("../modules/user/data-access/entitity/User");
const Group_1 = require("../modules/group/data-access/entity/Group");
exports.preloadMockData = () => __awaiter(void 0, void 0, void 0, function* () {
    const pathUserSeed = path_1.default.resolve(__dirname, '../', 'mocks', 'users.json');
    const pathGroupSeed = path_1.default.resolve(__dirname, '../', 'mocks', 'groups.json');
    const users = yield fs_1.default.promises.readFile(pathUserSeed, { encoding: 'utf-8' });
    const group = yield fs_1.default.promises.readFile(pathGroupSeed, { encoding: 'utf-8' });
    User_1.UserModel.bulkCreate(JSON.parse(users));
    Group_1.GroupModel.bulkCreate(JSON.parse(group));
});
//# sourceMappingURL=preloadMockData.js.map