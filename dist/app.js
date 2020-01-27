"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = express_1.default();
app.use(express_1.default.json());
app.use('/user', userRoutes_1.default);
app.use((req, res) => {
    res.status(404).send('Page not found');
});
app.listen(config_1.default.get("port"), () => {
    console.log(`Server is running at ${config_1.default.get("port")}!`);
});
//# sourceMappingURL=app.js.map