import { IUserServise, User } from '../models/user';
import fs from 'fs';
import path from 'path';
import util from 'util';

export class UserService implements IUserServise {
    private async getDataDB (): Promise<User[]> {
        const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
        const readFile = util.promisify(fs.readFile);
        try {
            const jsonData = await readFile(pathData, {encoding: 'utf-8'});
            return JSON.parse(jsonData);
        } catch {
            throw new Error('Error receiving data');
        }
    }
 
    public getAll(): Promise<User[]> {
        return this.getDataDB();
    }
    
    public async getById(id: number): Promise<User | undefined> {
        const users = await this.getDataDB();
        return users.find((user: User) => user.id == id.toString());
    }

    public async getAutoSuggest(loginSubstring: string, limit: number): Promise<User[]> {
        const users = await this.getDataDB();
        const result = users.filter((u: User) => {
            return u.login.includes(loginSubstring);
        });
        return result.slice(0, limit);
    }

    public async save(user: User): Promise<boolean> {
        const users = await this.getDataDB();
        users.push(user)

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
        const users = await this.getDataDB();
        const index = users.findIndex((u: User) => u.id == user.id);
        users[index] = user;

        try {
            const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
            const writeFile = util.promisify(fs.writeFile);
            writeFile(pathData, JSON.stringify(users, null, '\t'));
            return true;
        } catch {
            return false;
        }
    }

    public async delete(id: string) {
        const users = await this.getDataDB();
        const index = users.findIndex((u: User) => u.id == id);
        users[index].isDeleted = true; 

        try {
            const pathData = path.resolve(__dirname, '../', 'database', 'users.json');
            const writeFile = util.promisify(fs.writeFile);
            writeFile(pathData, JSON.stringify(users, null, '\t'));
            return true;
        } catch {
            return false;
        }
    }
}
