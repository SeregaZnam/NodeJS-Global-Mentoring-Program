import { IUserServise, User } from '../models/user';
import fs from 'fs';
import path from 'path';
import util from 'util';

export class UserService implements IUserServise {
    private data: User[] = [];

    constructor() {
        this.getDataDB();
    }

    private async getDataDB (): Promise<User[]> {
        const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
        const readFile = util.promisify(fs.readFile);
        try {
            const jsonData = await readFile(pathData, {encoding: 'utf-8'});
            this.data = JSON.parse(jsonData);
            return JSON.parse(jsonData);
        } catch {
            throw new Error('Error receiving data');
        }
    }
 
    public getAll(): User[] {
        return this.data;
    }
    
    public async getById(id: number): Promise<User | undefined> {
        const users = this.data;
        return users.find((user: User) => user.id == id.toString());
    }

    public async getAutoSuggest(loginSubstring: string, limit: number): Promise<User[]> {
        const users = this.data;
        const result = users.filter((u: User) => {
            return u.login.includes(loginSubstring);
        });
        return result.slice(0, limit);
    }

    public async save(user: User): Promise<boolean> {
        const users = this.data;
        users.push(user);
        this.data = users;

        try {
            const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
            const writeFile = util.promisify(fs.writeFile);
            writeFile(pathData, JSON.stringify(users, null, '\t'));
            return true;
        } catch {
            return false;
        }
    }

    public async update(user: User): Promise<boolean> {
        const users = this.data;
        const index = users.findIndex((u: User) => u.id == user.id);
        users[index] = user;
        this.data = users;

        try {
            const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
            const writeFile = util.promisify(fs.writeFile);
            writeFile(pathData, JSON.stringify(users, null, '\t'));
            return true;
        } catch {
            return false;
        }
    }

    public async delete(id: string): Promise<boolean> {
        const users = this.data;
        const index = users.findIndex((u: User) => u.id == id);
        users[index].isDeleted = true;
        this.data = users;

        try {
            const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
            const writeFile = util.promisify(fs.writeFile);
            writeFile(pathData, JSON.stringify(users, null, '\t'));
            return true;
        } catch {
            return false;
        }
    }

    public store(): User[] {
        return this.data;
    }
}
