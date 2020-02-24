import { GroupRepository } from '../database/repositories/GroupRepository';
import { UserRepository } from '../database/repositories/UserRepository';
import { Transaction } from 'sequelize/types';
import { GroupModel } from '../database/entities/Group';
import { UserModel } from '../database/entities/User';

export class UserGroupService {
   public static async save(userId: string, groupId: string, transaction: Transaction): Promise<boolean> {
      try {
         const group = await GroupRepository.getById(groupId) as GroupModel;
         const user = await UserRepository.getById(userId) as UserModel;

         if (!group || !user) {
            return false;
         }
         await group.addUserModel(user, { transaction });
         return true;
      } catch {
         return false;
      }
   }
}
