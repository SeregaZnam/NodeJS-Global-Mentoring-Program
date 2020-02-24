import { GroupRepository } from '../../group/repository/GroupRepository';
import { UserRepository } from '../../user/data-access/repository/UserRepository';
import { Transaction } from 'sequelize/types';
import { GroupModel } from '../../group/data-access/entity/Group';
import { UserModel } from '../../user/data-access/entitity/User';

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
