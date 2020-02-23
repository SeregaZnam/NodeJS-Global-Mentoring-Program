import { GroupRepository } from '../database/repositories/GroupRepository';
import { UserRepository } from '../database/repositories/UserRepository';
import { Transaction } from 'sequelize/types';

export class UserGroupService {
   constructor(
      private groupRepository: GroupRepository,
      private userRepository: UserRepository
   ) {}

   async save(userId: string, groupId: string, transaction: Transaction): Promise<boolean> {
      try {
         const group: any = await this.groupRepository.getById(groupId);
         const user: any = await this.userRepository.getById(userId);
         await group.addUserModel([user], transaction);
         return true;
      } catch {
         return false;
      }
   }
}
