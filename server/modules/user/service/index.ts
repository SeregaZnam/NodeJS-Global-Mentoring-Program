import { User } from '../models/user';
import { UserRepository } from '../data-access/repository/UserRepository';
import { UserModel } from '../data-access/entitity/User';
import logger from '../../../logger';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../constants/types';

@injectable()
export class UserService {
   constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

   public async getAll(): Promise<User[]> {
      const users = await this.userRepository.findAll();
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
         const users = await this.userRepository.findAll();
         const result = users.map((u: UserModel) => u.get({ plain: true }) as User)
            .filter((u: User) => {
               const user = u.login.toLocaleLowerCase();
               const substr = loginSubstring.toLocaleLowerCase();
               return user.includes(substr);
            });
         return result.slice(0, limit);
      } catch (err) {
         console.log(err);
         logger.error('Error get users with suggest', {
            err,
            method: 'getAutoSuggest',
            params: { loginSubstring, limit }
         });
      }
   }

   public async save(user: Omit<User, 'id'>): Promise<boolean> {
      try {
         await this.userRepository.create(user);
         return true;
      } catch {
         return false;
      }
   }

   public async update(user: User): Promise<boolean> {
      try {
         await this.userRepository.update(user);
         return true;
      } catch {
         return false;
      }
   }

   public async delete(id: string): Promise<boolean> {
      try {
         await this.userRepository.destroy(id);
         return true;
      } catch {
         return false;
      }
   }
}
