import { GroupRepository } from '../data-access/repository/GroupRepository';
import { Group, IGroupService } from '../models/group';
import { GroupDTO } from '../dto/groupDTO';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { GroupModel } from '../data-access/entity/Group';

@injectable()
export class GroupService implements IGroupService {
   constructor(@inject(TYPES.GroupRepository) private groupRepository: GroupRepository) {}

   public async getAll(): Promise<Group[] | undefined> {
      const groups = await this.groupRepository.findAll();
      return groups ? groups.map(g => g.get({ plain: true })) as Group[] : undefined;
   }

   public async getById(id: string): Promise<Group | undefined> {
      const group = await this.groupRepository.getById(id);
      return group ? group.get({ plain: true }) as Group : undefined;
   }

   public async save(group: GroupDTO): Promise<Group> {
      const createdGroup = await this.groupRepository.create(group);
      return createdGroup.get({ plain: true }) as GroupModel;
   }

   public async update(group: Group): Promise<Group> {
      const updatedGroup = await this.groupRepository.update(group);
      return updatedGroup.get({ plain: true }) as GroupModel;
   }

   public async delete(id: string): Promise<void> {
      await this.groupRepository.destroy(id);
   }
}
