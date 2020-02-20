import {DataTypes, Model, Sequelize} from "sequelize";

export class GroupModel extends Model<GroupModel> {
    public id!: string;
    public name!: string;
    public permissions!: string[];
}

export const initGroupModel = async (sequelize: Sequelize): Promise<GroupModel> => {
    GroupModel.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "groups",
        timestamps: false
    })

    return GroupModel as any;
};
