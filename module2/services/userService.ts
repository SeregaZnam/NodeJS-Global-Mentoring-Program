import { IUserServise, User } from '../models/user';
import UserModel from "../database/entities/User";
import GroupModel from "../database/entities/Group";

export class UserService implements IUserServise {
    private data: any = [];

    constructor() {
        this.getDataDB();
    }

    private async getDataDB (): Promise<any> {
        try {
            const users = await UserModel.findAll();
            this.data = users;
            return users;
        } catch {
            throw new Error('Error receiving data');
        }
    }
 
    public getAll(): User[] {
        return this.store();
    }
    
    public async getById(id: number): Promise<User | undefined> {
        const users = this.data;
        return users.find((user: User) => user.id == id.toString());
    }

    public async getAutoSuggest(
       loginSubstring: string,
       limit: number | undefined = undefined
    ): Promise<User[]> {
        const result = this.data.filter((u: User) => {
            const user = u.login.toLocaleLowerCase();
            const substr = loginSubstring.toLocaleLowerCase();
            return user.includes(substr);
        });
        return result.slice(0, limit);
    }

    public async save(user: User): Promise<boolean> {
        try {
            await UserModel.create(user);
            // update this.data
            this.getDataDB();
            return true;
        } catch {
            return false;
        }
    }

    public async update(user: User): Promise<boolean> {
        try {
            await UserModel.update({
                login: user.login,
                password: user.password,
                age: user.age
            }, {
                where: {id: user.id}
            });
            // update this.data
            this.getDataDB();
            return true;
        } catch {
            return false;
        }
    }

    public async delete(id: string): Promise<boolean> {
        try {
            await UserModel.destroy({
                where: {id}
            });
            this.getDataDB();
            return true;
        } catch {
            return false;
        }
    }

    public store(): User[] {
        return this.data;
    }
}
