import { DataTypes, Model, Sequelize } from 'sequelize';
import { GroupModel } from '../../../group/data-access/entity/Group';

export class UserModel extends Model {
   public id!: string;
   public login!: string;
   public password!: string;
   public age!: number;

   static associate = () => {
      UserModel.associations.groups = UserModel.belongsToMany(GroupModel, {
         through: 'user-group'
      });
   }
}

export const initUserModel = async (sequelize: Sequelize): Promise<UserModel> => {
   UserModel.init({
      id: {
         type: DataTypes.UUID,
         allowNull: false,
         primaryKey: true,
         defaultValue: DataTypes.UUIDV4
      },
      login: {
         type: DataTypes.STRING,
         allowNull: false
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      },
      age: {
         type: DataTypes.INTEGER
      }
   }, {
      sequelize,
      tableName: 'users'
   });

   return UserModel as any;
};
