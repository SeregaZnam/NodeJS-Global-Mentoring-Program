import {uuid} from 'uuidv4';

export class UserDTO {
    public id: string;
    public login: string;
    public password: string;
    public age: number;

    constructor() {
        this.id = uuid();
        this.login = '';
        this.password = '';
        this.age = 0;
    }
}