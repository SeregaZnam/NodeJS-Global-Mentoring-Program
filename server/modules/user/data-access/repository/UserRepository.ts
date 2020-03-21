import { User } from '../../models/user';
import { GroupModel } from '../../../group/data-access/entity/Group';
import { UserModel } from '../entitity/User';
import { injectable } from 'inversify';
import { Op } from 'sequelize';
import { UserQuery } from '../../types';

@injectable()
export class UserRepository {
	public async getById(id: string): Promise<UserModel | null> {
		return await UserModel.findByPk(id);
	}

	public async findAll({
		loginSubstring = '',
		limit = undefined,
		query = {}
	}: UserQuery): Promise<UserModel[]> {
		const users = await UserModel.findAll({
			include: [
				{
					model: GroupModel,
					through: {
						attributes: ['permissions']
					}
				}
			],
			where: {
				...query,
				login: {
					[Op.iLike]: `%${loginSubstring}%`
				}
			},
			limit
		});
		return users;
	}

	public async create(user: Omit<User, 'id'>): Promise<UserModel> {
		return await UserModel.create(user);
	}

	public async update(user: User): Promise<UserModel> {
		const [_, [updatedUser]] = await UserModel.update(
			{
				login: user.login,
				password: user.password,
				age: user.age
			},
			{
				where: { id: user.id },
				returning: true
			}
		);
		return updatedUser;
	}

	public async destroy(id: string): Promise<void> {
		await UserModel.destroy({
			where: { id }
		});
	}
}
