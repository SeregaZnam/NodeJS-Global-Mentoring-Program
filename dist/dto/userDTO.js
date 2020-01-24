"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
class UserDTO {
    constructor() {
        this.id = uuidv4_1.uuid();
        this.login = '';
        this.password = '';
        this.age = 0;
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=userDTO.js.map