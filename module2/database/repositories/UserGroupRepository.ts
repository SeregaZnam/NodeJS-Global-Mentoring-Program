import { ModelCtor, Model } from "sequelize/types";

export class UserGroupRepository {
    private UserGroupEntity: any;

    constructor(private userGroupModel: ModelCtor<Model>) {
        this.UserGroupEntity = this.userGroupModel;
    }

    async create(userId: string, groupId: string) {
        await this.UserGroupEntity.create({userId, groupId});
    }
}
