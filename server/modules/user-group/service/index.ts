import { GroupRepository } from '../../group/data-access/repository/GroupRepository';
import { UserRepository } from '../../user/data-access/repository/UserRepository';
import { Transaction } from 'sequelize/types';
import { GroupModel } from '../../group/data-access/entity/Group';
import { UserModel } from '../../user/data-access/entitity/User';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { NotFoundError } from '../../../errors';

@injectable()
export class UserGroupService {
   constructor(
      @inject(TYPES.GroupRepository) private groupRepository: GroupRepository,
      @inject(TYPES.UserRepository) private userRepository: UserRepository
   ) {}

   public async save(userId: string, groupId: string, transaction: Transaction) {
      const group = await this.groupRepository.getById(groupId) as GroupModel;
      const user = await this.userRepository.getById(userId) as UserModel;

      if (!group || !user) {
         throw new NotFoundError('Group or User not found');
      }
      await group.addUserModel(user, { transaction });
   }
}
