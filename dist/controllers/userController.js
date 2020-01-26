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
const userService_1 = require("../services/userService");
const Joi = __importStar(require("@hapi/joi"));
const userDTO_1 = require("../dto/userDTO");
const userService = new userService_1.UserService();
exports.getAutoSuggestUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const users = yield userService.getAutoSuggest(loginSubstring, limit);
    res.status(200).json(users);
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userDTO_1.UserDTO();
    const schema = Joi.object({
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
    try {
        const value = yield schema.validateAsync(req.body);
        user.login = value.login;
        user.password = value.password;
        user.age = value.age;
        (yield userService.save(user))
            ? res.status(201).json(true)
            : res.status(404).end();
    }
    catch (err) {
        res.status(400).json(err.details[0].message).end();
    }
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userService.getById(id);
    // const userDb = await User.findAll();
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).end();
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userService.getById(id);
    if (!user) {
        res.status(404).end();
        return;
    }
    const schema = Joi.object({
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
    try {
        const value = yield schema.validateAsync(req.body);
        user.login = value.login;
        user.password = value.password;
        user.age = value.age;
        (yield userService.update(user))
            ? res.status(201).json(true)
            : res.status(404).end();
    }
    catch (err) {
        res.status(400).json(err.details[0].message).end();
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userService.getById(id);
    if (user && (yield userService.delete(user.id))) {
        res.status(201).json(true);
    }
    else {
        res.status(404).end();
    }
});
//# sourceMappingURL=userController.js.map