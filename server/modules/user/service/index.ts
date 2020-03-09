import { User } from '../models/user';
import { UserRepository } from '../data-access/repository/UserRepository';
import { UserModel } from '../data-access/entitity/User';
import logger from '../../../logger';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../constants/types';

@injectable()
export class UserService {
   constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

   public async getAll(query?: any): Promise<User[]> {
      const users = await this.userRepository.findAll({ query });
      return users.map((user: UserModel) => user.get({ plain: true }) as User);
   }

   public async getById(id: string): Promise<User | undefined> {
      const user = await this.userRepository.getById(id);
      return user ? user.get({ plain: true }) as User : undefined;
   }

   public async getAutoSuggest(
      loginSubstring: string,
      limit: number | undefined = undefined
   ): Promise<User[] | void> {
      try {
         const users = await this.userRepository.findAll({ loginSubstring, limit });
         return users.map((user: UserModel) => user.get({ plain: true }) as User);
      } catch (err) {
         logger.error('Error get users with suggest', {
            err,
            method: 'getAutoSuggest',
            params: { loginSubstring, limit }
         });
      }
   }

   public async save(user: Omit<User, 'id'>): Promise<boolean> {
      await this.userRepository.create(user);
      return true;
   }

   public async update(user: User): Promise<boolean> {
      await this.userRepository.update(user);
      return true;
   }

   public async delete(id: string): Promise<boolean> {
      await this.userRepository.destroy(id);
      return true;
   }
}
