"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("@hapi/joi"));
exports.UserSchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[A-Za-z])/)
        .required(),
    age: Joi.number()
        .min(4)
        .max(130)
        .required()
});
//# sourceMappingURL=userSchemas.js.map