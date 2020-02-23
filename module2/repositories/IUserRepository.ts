import { User } from '../models/user';
import { UserModel } from '../database/entities/User';

export interface IUserRepository {

    getById(id: string): Promise<UserModel>

    findAll(): Promise<UserModel[]>;

    create(user: User): void;

    update(user: User): void;

    destroy(id: string): void;

}
