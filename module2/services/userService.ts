import { IUserServise, User } from '../models/user';
import { UserRepository } from '../database/repositories/UserRepository';
import { UserModel } from '../database/entities/User';

export class UserService implements IUserServise {
   constructor(private userRepository: UserRepository) {}

   public async getAll(): Promise<User[]> {
      const users = await this.userRepository.findAll();
      return users.map((user: UserModel) => user.get({ plain: true }) as User);
   }

   public async getById(id: number | string): Promise<User | undefined> {
      const users = await this.userRepository.findAll();
      return users
         .map((user: UserModel) => user.get({ plain: true }) as User)
         .find((user: User) => user.id === id.toString());
   }

   public async getAutoSuggest(
      loginSubstring: string,
      limit: number | undefined = undefined
   ): Promise<User[]> {
      const users = await this.userRepository.findAll();
      const result = users.map((u) => u.get({ plain: true }) as User)
         .filter((u: User) => {
            const user = u.login.toLocaleLowerCase();
            const substr = loginSubstring.toLocaleLowerCase();
            return user.includes(substr);
         });
      return result.slice(0, limit);
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
