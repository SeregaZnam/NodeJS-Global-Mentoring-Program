import {DataTypes, ModelCtor, Model} from "sequelize";
import {sequelize} from "../database";
// import GroupModel from "./Group";

sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUID
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
  tableName: "users",
  timestamps: false
});

// sequelize.models.User.belongsToMany(GroupModel, {
//   through: 'UserGroup',
//   as: 'users',
//   foreignKey: 'userId',
//   otherKey: 'groupId'
// });

export default sequelize.models.User as ModelCtor<Model>;
