import {sequelize} from "../database";
import {DataTypes, ModelCtor, Model} from "sequelize";

// const Group: any = sequelize.define('Group', {
//     id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     permissions: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: false
//     }
// }, {
//     tableName: "groups",
//     timestamps: false
// });
  
// export { Group };