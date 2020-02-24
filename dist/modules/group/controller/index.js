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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("@hapi/joi"));
const service_1 = require("../service");
exports.getAllGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield service_1.GroupService.getAll();
    if (groups) {
        res.status(200).json(groups);
    }
    else {
        res.status(404).end();
    }
});
exports.createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        permissions: Joi.array()
            .items(Joi.string())
            .required()
    });
    try {
        const value = yield schema.validateAsync(req.body);
        const group = {
            name: value.name,
            permissions: value.permissions
        };
        // eslint-disable-next-line no-unused-expressions
        (yield service_1.GroupService.save(group))
            ? res.status(201).json(true)
            : res.status(404).end();
    }
    catch (err) {
        res.status(400).json(err.details[0].message).end();
    }
});
exports.getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const group = yield service_1.GroupService.getById(id);
    if (group) {
        res.status(200).json(group);
    }
    else {
        res.status(404).end();
    }
});
exports.updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const group = yield service_1.GroupService.getById(id);
    if (!group) {
        res.status(404).end();
        return;
    }
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        permissions: Joi.array()
            .items(Joi.string())
            .required()
    });
    try {
        const value = yield schema.validateAsync(req.body);
        group.name = value.name;
        group.permissions = value.permissions;
        // eslint-disable-next-line no-unused-expressions
        (yield service_1.GroupService.update(group))
            ? res.status(201).json(true)
            : res.status(404).end();
    }
    catch (err) {
        res.status(400).json(err.details[0].message).end();
    }
});
exports.deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const group = yield service_1.GroupService.getById(id);
    if (group && (yield service_1.GroupService.delete(group.id))) {
        res.status(201).json(true);
    }
    else {
        res.status(404).end();
    }
});
//# sourceMappingURL=index.js.map