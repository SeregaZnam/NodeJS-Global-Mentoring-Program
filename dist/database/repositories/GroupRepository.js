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
class GroupRepository {
    constructor(groupModel) {
        this.groupModel = groupModel;
        this.GroupEntity = this.groupModel;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.GroupEntity.getById(id);
            return group;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.GroupEntity.findAll();
            return users;
        });
    }
    create(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.GroupEntity.create(group);
        });
    }
    update(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.GroupEntity.update({
                name: group.name,
                permissions: group.permissions
            }, {
                where: { id: group.id }
            });
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.GroupEntity.destroy({
                where: { id }
            });
        });
    }
}
exports.GroupRepository = GroupRepository;
//# sourceMappingURL=GroupRepository.js.map