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
const logger_1 = __importDefault(require("../logger"));
const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;
const calculateExecutionTime = (time) => (time[0] * NS_PER_SEC + time[1]) / MS_PER_NS;
exports.executionTime = () => (_target, _properyName, descriptor) => {
    const fn = descriptor.value;
    if (typeof fn !== 'function') {
        throw new SyntaxError(`@executionTime can only be used on functions, not: ${fn}`);
    }
    return Object.assign(Object.assign({}, descriptor), { value() {
            return __awaiter(this, arguments, void 0, function* () {
                const hrstart = process.hrtime();
                const result = yield fn.apply(this, arguments);
                const hrend = process.hrtime(hrstart);
                logger_1.default.info(`method ${_properyName} worked in ${calculateExecutionTime(hrend)}ms`);
                return result;
            });
        } });
};
//# sourceMappingURL=executionTime.js.map