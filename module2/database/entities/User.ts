import {DataTypes, Model, Sequelize} from "sequelize";

export class UserModel extends Model<UserModel> {
  public id!: string;
  public login!: string;
  public password!: string;
  public age!: string;
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
    tableName: "users",
    timestamps: false
  })

  return UserModel as any;
};
