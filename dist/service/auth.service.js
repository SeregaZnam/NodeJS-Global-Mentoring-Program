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
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../configs/config"));
const inversify_1 = require("inversify");
const types_1 = require("../constants/types");
const errors_1 = require("../errors");
let AuthService = class AuthService {
    constructor(logger) {
        this.logger = logger;
    }
    extractToken(req) {
        return req.headers['x-access-token'] || req.headers.authorization;
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.extractToken(req);
            const jwtConfig = config_1.default.get('jwt');
            if (token) {
                jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
                    if (err) {
                        this.logger.error(err.message, 'Token does not verified');
                        throw new errors_1.InvalidTokenError(token);
                    }
                    else {
                        // TODO
                        console.log(decoded);
                        return next();
                    }
                });
            }
            else {
                this.logger.error('No token');
                throw new errors_1.InvalidTokenError(token);
            }
        });
    }
    signToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtConfig = config_1.default.get('jwt');
            return new Promise((res, rej) => {
                jwt.sign(user, jwtConfig.secretKey, {
                    expiresIn: '4h'
                }, (err, token) => {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res(token);
                    }
                });
            });
        });
    }
};
AuthService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Logger)),
    __metadata("design:paramtypes", [Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map