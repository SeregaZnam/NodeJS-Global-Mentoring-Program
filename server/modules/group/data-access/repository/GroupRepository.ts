import { Group } from '../../models/group';
import { GroupDTO } from '../../dto/groupDTO';
import { GroupModel } from '../entity/Group';
import { injectable } from 'inversify';

@injectable()
export class GroupRepository {
   public async getById(id: string): Promise<GroupModel | null> {
      return await GroupModel.findByPk(id);
   }

   public async findAll(): Promise<GroupModel[]> {
      const users = await GroupModel.findAll();
      return users;
   }

   public async create(group: GroupDTO) {
      await GroupModel.create(group);
   }

   public async update(group: Group) {
      await GroupModel.update({
         name: group.name,
         permissions: group.permissions
      }, {
         where: { id: group.id }
      });
   }

   public async destroy(id: string) {
      await GroupModel.destroy({
         where: { id }
      });
   }
}
