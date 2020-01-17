"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convict_1 = __importDefault(require("convict"));
const config = convict_1.default({
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT",
        arg: "port",
    }
});
exports.default = config;
//# sourceMappingURL=config.js.map