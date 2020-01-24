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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const database_1 = require("./database/database");
const app = express_1.default();
app.use(express_1.default.json());
app.use('/user', userRoutes_1.default);
app.use((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        res.status(404).send('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(404).send('Unable to connect to the database');
    }
    // res.status(404).send('Page not found');
}));
app.listen(config_1.default.get("port"), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running at ${config_1.default.get("port")}!`);
}));
//# sourceMappingURL=app.js.map