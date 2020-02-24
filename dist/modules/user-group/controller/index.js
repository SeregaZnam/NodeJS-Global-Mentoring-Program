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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("@hapi/joi"));
const service_1 = require("../service");
const database_1 = require("../../../database");
const config_1 = __importDefault(require("../../../config"));
exports.createUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object({
        userId: Joi.string()
            .required(),
        groupId: Joi.string()
            .required()
    });
    const dbConnect = yield database_1.createDbConnect(config_1.default);
    const transaction = yield dbConnect.sequelize.transaction();
    try {
        const value = yield schema.validateAsync(req.body);
        // eslint-disable-next-line no-unused-expressions
        (yield service_1.UserGroupService.save(value.userId, value.groupId, transaction))
            ? res.status(201).json(true)
            : res.status(404).end();
        transaction.commit();
    }
    catch (err) {
        res.status(400).json(err.details[0].message).end();
        transaction.rollback();
    }
});
//# sourceMappingURL=index.js.map