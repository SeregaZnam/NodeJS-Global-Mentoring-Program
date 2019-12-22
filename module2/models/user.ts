import {uuid} from 'uuidv4';

export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export class UserDB {
    public id: string;
    public login: string;
    public password: string;
    public age: number;
    public isDeleted: boolean;

    constructor() {
        this.id = uuid();
        this.login = '';
        this.password = '';
        this.age = 0;
        this.isDeleted = false;
    }
}

export interface IUserServise {
    getAll(): Promise<User[]>;
    
    getById(id: number): Promise<User | undefined>;

    getAutoSuggest(limit: number, loginSubstring: string): Promise<User[]>;

    save(user: User): Promise<boolean>;

    update(user: User): Promise<boolean>;

    delete(id: string): Promise<boolean>;

    // loadDataFromFile(): void;

    // store(): void
}