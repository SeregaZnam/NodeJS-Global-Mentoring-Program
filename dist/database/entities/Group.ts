import {sequelize} from "../database";
import {DataTypes, ModelCtor, Model} from "sequelize";

// sequelize.define('Group', {
//    id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//       defaultValue: DataTypes.UUID
//    },
//    name: {
//       type: DataTypes.STRING,
//       allowNull: false
//    },
//    permissions: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false
//    }
// }, {
//    tableName: "groups",
//    timestamps: false
// });

// export default sequelize.models.Group as ModelCtor<Model>;