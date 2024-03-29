import { User } from '../models/user';
import { UserRepository } from '../data-access/repository/UserRepository';
import { UserModel } from '../data-access/entitity/User';
import { Logger } from '../../../logger';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../constants/types';

@injectable()
export class UserService {
	constructor(
		@inject(TYPES.Logger) private logger: Logger,
		@inject(TYPES.UserRepository) private userRepository: UserRepository
	) {}

	public async getAll(query?: any): Promise<User[]> {
		const users = await this.userRepository.findAll({ query });
		return users.map((user: UserModel) => user.get({ plain: true }) as User);
	}

	public async getById(id: string): Promise<User | undefined> {
		const user = await this.userRepository.getById(id);
		return user ? (user.get({ plain: true }) as User) : undefined;
	}

	public async getAutoSuggest(
		loginSubstring: string,
		limit: number | undefined = undefined
	): Promise<User[] | void> {
		const users = await this.userRepository.findAll({ loginSubstring, limit });
		return users.map((user: UserModel) => user.get({ plain: true }) as User);
	}

	public async save(user: Omit<User, 'id'>): Promise<User> {
		const createdUser: UserModel = await this.userRepository.create(user);
		return createdUser.get({ plain: true }) as UserModel;
	}

	public async update(user: User): Promise<UserModel> {
		const updatedUser = await this.userRepository.update(user);
		return updatedUser.get({ plain: true }) as UserModel;
	}

	public async delete(id: string): Promise<void> {
		await this.userRepository.destroy(id);
	}
}
