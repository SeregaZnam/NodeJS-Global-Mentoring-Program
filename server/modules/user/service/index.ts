import { User } from '../models/user';
import { UserRepository } from '../data-access/repository/UserRepository';
import { UserModel } from '../data-access/entitity/User';
import logger from '../../../logger';

export class UserService {
   public static async getAll(): Promise<User[]> {
      const users = await UserRepository.findAll();
      return users.map((user: UserModel) => user.get({ plain: true }) as User);
   }

   public static async getById(id: string): Promise<User | undefined> {
      const user = await UserRepository.getById(id);
      return user ? user.get({ plain: true }) as User : undefined;
   }

   public static async getAutoSuggest(
      loginSubstring: string,
      limit: number | undefined = undefined
   ): Promise<User[] | void> {
      try {
         const users = await UserRepository.findAll();
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

   public static async save(user: Omit<User, 'id'>): Promise<boolean> {
      try {
         await UserRepository.create(user);
         return true;
      } catch {
         return false;
      }
   }

   public static async update(user: User): Promise<boolean> {
      try {
         await UserRepository.update(user);
         return true;
      } catch {
         return false;
      }
   }

   public static async delete(id: string): Promise<boolean> {
      try {
         await UserRepository.destroy(id);
         return true;
      } catch {
         return false;
      }
   }
}
