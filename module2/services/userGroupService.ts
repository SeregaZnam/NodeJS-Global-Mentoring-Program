import { GroupRepository } from '../database/repositories/GroupRepository';
import { UserRepository } from '../database/repositories/UserRepository';

export class UserGroupService {
   constructor(
      private groupRepository: GroupRepository,
      private userRepository: UserRepository
   ) {}

   async save(userId: string, groupId: string): Promise<boolean> {
      try {
         const group: any = await this.groupRepository.getById(groupId);
         const user: any = await this.userRepository.getById(userId);
         await group.addUserModel([user]);
         return true;
      } catch {
         return false;
      }
   }
}
