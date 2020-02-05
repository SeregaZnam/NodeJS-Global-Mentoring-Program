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
const User_1 = __importDefault(require("../database/entities/User"));
const GroupRepository_1 = require("../database/repositories/GroupRepository");
const groupService_1 = require("../services/groupService");
const groupRepository = new GroupRepository_1.GroupRepository(User_1.default);
const groupService = new groupService_1.GroupService(groupRepository);
// TODO
exports.getAllGroups = () => __awaiter(void 0, void 0, void 0, function* () { });
// TODO
exports.createGroup = () => __awaiter(void 0, void 0, void 0, function* () { });
// TODO
exports.getGroup = () => __awaiter(void 0, void 0, void 0, function* () { });
// TODO
exports.updateGroup = () => __awaiter(void 0, void 0, void 0, function* () { });
// TODO
exports.deleteGroup = () => __awaiter(void 0, void 0, void 0, function* () { });
//# sourceMappingURL=groupController.js.map