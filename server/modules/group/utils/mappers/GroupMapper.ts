import { Group } from '../../models/group';
import { GroupDTO } from '../../dto/groupDTO';

export class GroupMapper {
	static toDTO(group: Group): GroupDTO {
		const { createdAt, updatedAt, ...groupDTO } = group;
		return groupDTO;
	}
}
