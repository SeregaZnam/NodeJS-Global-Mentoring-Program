import {sequelize} from "../database";
import {DataTypes, ModelCtor, Model, Sequelize} from "sequelize";
// import UserModel from "./User";

sequelize.define('Group', {
   id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUID
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
   tableName: "groups",
   timestamps: false
});

// sequelize.models.Group.belongsToMany(UserModel, {
//    through: 'UserGroup',
//    as: 'groups',
//    foreignKey: 'groupId',
//    otherKey: 'userId'
// });

export default sequelize.models.Group as ModelCtor<Model>;
