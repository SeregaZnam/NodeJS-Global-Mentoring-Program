"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const service_1 = require("../service");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const executionTime_1 = require("../../../utils/executionTime");
const types_1 = require("../../../constants/types");
const errors_1 = require("../../../errors");
const groupSchemas_1 = require("../schemas/groupSchemas");
const validate_1 = require("../../../utils/validate");
const GroupMapper_1 = require("../utils/mappers/GroupMapper");
let GroupController = class GroupController extends inversify_express_utils_1.BaseHttpController {
    constructor(logger, groupService) {
        super();
        this.logger = logger;
        this.groupService = groupService;
    }
    getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield this.groupService.getAll();
                return this.json((groups || []).map((g) => GroupMapper_1.GroupMapper.toDTO(g)));
            }
            catch (err) {
                this.logger.error('Error get users with suggest', {
                    err,
                    method: 'getAllGroups'
                });
                throw new errors_1.NotFoundError('Error getting groups');
            }
        });
    }
    createGroup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield validate_1.validateBody(groupSchemas_1.GroupSchema, req.body);
                const group = {
                    name: value.name,
                    permissions: value.permissions
                };
                const createdGroup = yield this.groupService.save(group);
                return this.json(GroupMapper_1.GroupMapper.toDTO(createdGroup));
            }
            catch (err) {
                this.logger.error('Error create request', {
                    method: 'createGroup',
                    params: {
                        name: req.body.name,
                        permissions: req.body.permissions
                    }
                });
                throw new errors_1.CreateError('Error create group');
            }
        });
    }
    getGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield this.groupService.getById(id);
                return this.json(group && GroupMapper_1.GroupMapper.toDTO(group));
            }
            catch (_a) {
                this.logger.error('Error getting user', {
                    method: 'getGroup',
                    params: { id }
                });
                throw new errors_1.NotFoundError('Error getting group');
            }
        });
    }
    updateGroup(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.groupService.getById(id);
            if (!group) {
                throw new errors_1.NotFoundError('Group not found');
            }
            try {
                const value = yield validate_1.validateBody(groupSchemas_1.GroupSchema, body);
                group.name = value.name;
                group.permissions = value.permissions;
                const updatedGroup = yield this.groupService.update(group);
                return this.json(GroupMapper_1.GroupMapper.toDTO(updatedGroup));
            }
            catch (_a) {
                this.logger.error('Error updating group', {
                    method: 'updateGroup',
                    params: { id }
                });
                throw new errors_1.UpdateError('Error update group');
            }
        });
    }
    deleteGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield this.groupService.getById(id);
                if (group) {
                    yield this.groupService.delete(group.id);
                    return this.json(true);
                }
            }
            catch (_a) {
                throw new errors_1.DeleteError('Error deleting group');
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet(''),
    executionTime_1.executionTime(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAllGroups", null);
__decorate([
    inversify_express_utils_1.httpPut(''),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroup", null);
__decorate([
    inversify_express_utils_1.httpGet('/:id'),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroup", null);
__decorate([
    inversify_express_utils_1.httpPost('/:id'),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestBody()),
    __param(1, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateGroup", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:id'),
    executionTime_1.executionTime(),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteGroup", null);
GroupController = __decorate([
    inversify_express_utils_1.controller('/group'),
    __param(0, inversify_1.inject(types_1.TYPES.Logger)),
    __param(1, inversify_1.inject(types_1.TYPES.GroupService)),
    __metadata("design:paramtypes", [Object, service_1.GroupService])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=index.js.map