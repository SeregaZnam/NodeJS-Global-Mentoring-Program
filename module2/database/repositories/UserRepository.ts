import { User } from '../../models/user';
import { IUserRepository } from '../../repositories/IUserRepository';
import { GroupModel } from '../entities/Group';
import { UserModel } from '../entities/User';

export class UserRepository implements IUserRepository {
   private UserEntity: any;

   constructor() {
      this.UserEntity = UserModel;
   }

   async getById(id: string): Promise<UserModel> {
      const user = await this.UserEntity.findByPk(id);
      return user;
   }

   async findAll(): Promise<UserModel[]> {
      const users = await this.UserEntity.findAll({
         include: GroupModel
      });
      return users;
   }

   async create(user: Omit<User, 'id'>) {
      await this.UserEntity.create(user);
   }

   async update(user: User) {
      await this.UserEntity.update({
         login: user.login,
         password: user.password,
         age: user.age
      }, {
         where: { id: user.id }
      });
   }

   async destroy(id: string) {
      await this.UserEntity.destroy({
         where: { id }
      });
   }
}
