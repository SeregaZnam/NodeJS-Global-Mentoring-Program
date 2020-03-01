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
const GroupRepository_1 = require("../repository/GroupRepository");
class GroupService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield GroupRepository_1.GroupRepository.findAll();
                return groups;
            }
            catch (_a) {
                throw new Error('Error receiving groups');
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield GroupRepository_1.GroupRepository.getById(id);
            return group ? group.get({ plain: true }) : undefined;
        });
    }
    static save(group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield GroupRepository_1.GroupRepository.create(group);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static update(group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield GroupRepository_1.GroupRepository.update(group);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield GroupRepository_1.GroupRepository.destroy(id);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.GroupService = GroupService;
//# sourceMappingURL=index.js.map