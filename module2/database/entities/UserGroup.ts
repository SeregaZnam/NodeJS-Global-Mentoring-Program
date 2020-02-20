import { Model, Sequelize, DataTypes } from "sequelize";
import { GroupModel } from "./Group";
import { UserModel } from "./User";

export class UserGroupModel extends Model<UserGroupModel> {
    public id!: string;
    public userId!: string;
    public groupId!: string;
}

export const initUserGroupModel = async (sequelize: Sequelize) => {
    UserGroupModel.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.UUID,
        },
        groupId: {
            type: DataTypes.UUID,
        }
    }, {
        sequelize,
        tableName: "user-group",
        timestamps: false
    })

    sequelize.models.UserModel.belongsToMany(GroupModel, {
        through: 'user-group'
    });

    sequelize.models.GroupModel.belongsToMany(UserModel, {
        through: 'user-group',
    });

    return UserGroupModel as any;
};
