import { GroupRepository } from '../database/repositories/GroupRepository';
import { IGroupServise, Group } from '../models/group';
import { GroupDTO } from '../dto/groupDTO';
import { GroupModel } from '../database/entities/Group';

export class GroupService {
   public static async getAll(): Promise<any> {
      try {
         const groups = await GroupRepository.findAll();
         return groups;
      } catch {
         throw new Error('Error receiving groups');
      }
   }

   public static async getById(id: string): Promise<Group | undefined> {
      const group = await GroupRepository.getById(id);
      return group ? group.get({ plain: true }) as Group : undefined;
   }

   public static async save(group: GroupDTO): Promise<boolean> {
      try {
         await GroupRepository.create(group);
         return true;
      } catch {
         return false;
      }
   }

   public static async update(group: Group): Promise<boolean> {
      try {
         await GroupRepository.update(group);
         return true;
      } catch {
         return false;
      }
   }

   public static async delete(id: string): Promise<boolean> {
      try {
         await GroupRepository.destroy(id);
         return true;
      } catch {
         return false;
      }
   }
}
