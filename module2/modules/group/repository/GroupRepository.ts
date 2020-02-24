import { Group } from '../models/group';
import { GroupDTO } from '../dto/groupDTO';
import { GroupModel } from '../data-access/entity/Group';

export class GroupRepository {
   public static async getById(id: string): Promise<GroupModel | null> {
      return await GroupModel.findByPk(id);
   }

   public static async findAll(): Promise<GroupModel[]> {
      const users = await GroupModel.findAll();
      return users;
   }

   public static async create(group: GroupDTO) {
      await GroupModel.create(group);
   }

   public static async update(group: Group) {
      await GroupModel.update({
         name: group.name,
         permissions: group.permissions
      }, {
         where: { id: group.id }
      });
   }

   public static async destroy(id: string) {
      await GroupModel.destroy({
         where: { id }
      });
   }
}
