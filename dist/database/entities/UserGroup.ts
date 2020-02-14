import { sequelize } from "../database";
import { DataTypes, ModelCtor, Model } from "sequelize/types";

// sequelize.define('UserGroup', {
//   userId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: 'User',
//       key: 'id'
//     }
//   },
//   groupId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: 'Group',
//       key: 'id'
//     }
//   }
// }, {
//   tableName: "usergroup",
//   timestamps: false
// });

// export default sequelize.models.UserGroup as ModelCtor<Model>;