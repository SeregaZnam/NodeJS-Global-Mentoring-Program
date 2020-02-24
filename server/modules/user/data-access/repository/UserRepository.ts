import { User } from '../../models/user';
import { GroupModel } from '../../../group/data-access/entity/Group';
import { UserModel } from '../entitity/User';
import { injectable } from 'inversify';

@injectable()
export class UserRepository {
   public async getById(id: string): Promise<UserModel | null> {
      const user = await UserModel.findByPk(id);
      return user;
   }

   public async findAll(): Promise<UserModel[]> {
      const users = await UserModel.findAll({
         include: [GroupModel]
      });
      return users;
   }

   public async create(user: Omit<User, 'id'>) {
      await UserModel.create(user);
   }

   public async update(user: User) {
      await UserModel.update({
         login: user.login,
         password: user.password,
         age: user.age
      }, {
         where: { id: user.id }
      });
   }

   public async destroy(id: string) {
      await UserModel.destroy({
         where: { id }
      });
   }
}
