import { Group } from '../../models/group';
import { GroupDTO } from '../../dto/groupDTO';
import { GroupModel } from '../entity/Group';
import { injectable } from 'inversify';

@injectable()
export class GroupRepository {
	public async getById(id: string): Promise<GroupModel | null> {
		return await GroupModel.findByPk(id);
	}

	public async findAll(): Promise<GroupModel[]> {
		return await GroupModel.findAll();
	}

	public async create(group: GroupDTO): Promise<GroupModel> {
		return await GroupModel.create(group);
	}

	public async update(group: Group): Promise<GroupModel> {
		const [_, [updatedGroup]] = await GroupModel.update(
			{
				name: group.name,
				permissions: group.permissions
			},
			{
				where: { id: group.id },
				returning: true
			}
		);
		return updatedGroup;
	}

	public async destroy(id: string) {
		await GroupModel.destroy({
			where: { id }
		});
	}
}
