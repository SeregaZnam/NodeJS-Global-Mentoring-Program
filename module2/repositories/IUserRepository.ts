import { User } from '../models/user';

export interface IUserRepository {

    getById(id: string): Promise<User>

    findAll(): Promise<User[]>;

    create(user: User): void;

    update(user: User): void;

    destroy(id: string): void;

}
