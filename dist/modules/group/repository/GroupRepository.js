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
const Group_1 = require("../data-access/entity/Group");
class GroupRepository {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Group_1.GroupModel.findByPk(id);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield Group_1.GroupModel.findAll();
            return users;
        });
    }
    static create(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Group_1.GroupModel.create(group);
        });
    }
    static update(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Group_1.GroupModel.update({
                name: group.name,
                permissions: group.permissions
            }, {
                where: { id: group.id }
            });
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Group_1.GroupModel.destroy({
                where: { id }
            });
        });
    }
}
exports.GroupRepository = GroupRepository;
//# sourceMappingURL=GroupRepository.js.map