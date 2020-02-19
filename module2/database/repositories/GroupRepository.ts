import { IGroupRepository } from "../../repositories/IGroupRepository";
import { ModelCtor, Model } from "sequelize/types";
import { Group } from "../../models/group";
import { GroupDTO } from "../../dto/groupDTO";

export class GroupRepository implements IGroupRepository {
    private GroupEntity: any;

    constructor(private groupModel: ModelCtor<Model>) {
        this.GroupEntity = this.groupModel;
    }

    async getById(id: string): Promise<Group> {
        return await this.GroupEntity.findByPk(id);
    }
    
    async findAll(): Promise<Group[]> {
        const users = await this.GroupEntity.findAll();
        return users;
    }

    async create(group: GroupDTO) {
        await this.GroupEntity.create(group);
    }
    
    async update(group: Group) {
        await this.GroupEntity.update({
            name: group.name,
            permissions: group.permissions
        }, {
            where: {id: group.id}
        });
    }

    async destroy(id: string) {
        await this.GroupEntity.destroy({
            where: {id}
        });
    }

}
