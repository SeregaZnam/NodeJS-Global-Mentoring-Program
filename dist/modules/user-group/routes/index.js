"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userGroupController = __importStar(require("../controller"));
const router = express_1.Router();
router.route('/').put(userGroupController.createUserGroup);
exports.default = router;
//# sourceMappingURL=index.js.map