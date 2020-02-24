import { GroupRepository } from '../data-access/repository/GroupRepository';
import { Group } from '../models/group';
import { GroupDTO } from '../dto/groupDTO';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../constants/types';

@injectable()
export class GroupService {
   constructor(@inject(TYPES.GroupRepository) private groupRepository: GroupRepository) {}

   public async getAll(): Promise<any> {
      try {
         const groups = await this.groupRepository.findAll();
         return groups;
      } catch {
         throw new Error('Error receiving groups');
      }
   }

   public async getById(id: string): Promise<Group | undefined> {
      const group = await this.groupRepository.getById(id);
      return group ? group.get({ plain: true }) as Group : undefined;
   }

   public async save(group: GroupDTO): Promise<boolean> {
      try {
         await this.groupRepository.create(group);
         return true;
      } catch {
         return false;
      }
   }

   public async update(group: Group): Promise<boolean> {
      try {
         await this.groupRepository.update(group);
         return true;
      } catch {
         return false;
      }
   }

   public async delete(id: string): Promise<boolean> {
      try {
         await this.groupRepository.destroy(id);
         return true;
      } catch {
         return false;
      }
   }
}
