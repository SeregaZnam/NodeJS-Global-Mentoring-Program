import { ModelCtor, Model } from "sequelize/types";
import { User } from "../../models/user";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
    private UserEntity: any;

    constructor(private userModel: ModelCtor<Model>) {
        this.UserEntity = this.userModel;
    }

    async findAll(): Promise<User[]> {
        const users = await this.UserEntity.findAll();
        return users;
    }

    async create(user: User) {
        await this.UserEntity.create(user);
    }

    async update(user: User) {
        await this.UserEntity.update({
            login: user.login,
            password: user.password,
            age: user.age
        }, {
            where: {id: user.id}
        });
    }

    async destroy(id: string) {
        await this.UserEntity.destroy({
            where: {id}
        });
    }

}