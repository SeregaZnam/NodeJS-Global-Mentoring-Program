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
const GroupRepository_1 = require("../../group/repository/GroupRepository");
const UserRepository_1 = require("../../user/data-access/repository/UserRepository");
class UserGroupService {
    static save(userId, groupId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield GroupRepository_1.GroupRepository.getById(groupId);
                const user = yield UserRepository_1.UserRepository.getById(userId);
                if (!group || !user) {
                    return false;
                }
                yield group.addUserModel(user, { transaction });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.UserGroupService = UserGroupService;
//# sourceMappingURL=index.js.map