import { ModelCtor, Model } from "sequelize/types";
import { User } from "../../models/user";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
    UserEntity: any;

    constructor(private userModel: ModelCtor<Model>) {
        this.UserEntity = this.userModel;
    }

    async findAll(): Promise<User[]> {
        const users: any = await this.userModel.findAll();
        return users;
    }

    async create(user: User) {
        await this.userModel.create(user);
    }

    async update(user: User) {
        await this.userModel.update({
            login: user.login,
            password: user.password,
            age: user.age
        }, {
            where: {id: user.id}
        });
    }

    async destroy(id: string) {
        await this.userModel.destroy({
            where: {id}
        });
    }

}
