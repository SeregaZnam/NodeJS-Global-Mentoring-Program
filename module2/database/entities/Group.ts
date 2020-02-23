import { DataTypes, Model, Sequelize, HasManyAddAssociationMixin } from 'sequelize';
import { UserModel } from './User';

export class GroupModel extends Model {
   public id!: string;
   public name!: string;
   public permissions!: string[];

   addUserModel!: HasManyAddAssociationMixin<UserModel, string>;

   static associate = () => {
      GroupModel.associations.users = GroupModel.belongsToMany(UserModel, {
         through: 'user-group'
      });
   }
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
      tableName: 'groups',
      timestamps: false
   });

   return GroupModel as any;
};
