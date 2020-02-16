import {DataTypes, ModelCtor, Model} from "sequelize";
import {sequelize} from "../database";
import fs from "fs";
import path from "path";

const User: any = sequelize.define('User', {
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
  tableName: "users",
  timestamps: false
});

const Group: any = sequelize.define('Group', {
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
  tableName: "groups",
  timestamps: false
});

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

sequelize.models.User.belongsToMany(Group, {
  through: 'UserGroup'
  // as: 'users',
  // foreignKey: 'userId',
  // otherKey: 'groupId'
});

sequelize.models.Group.belongsToMany(User, {
   through: 'UserGroup',
  //  as: 'groups',
  //  foreignKey: 'groupId',
  //  otherKey: 'userId'
});

(async () => {

  await sequelize.sync();

  // const user1 = await User.create({
  //   "login": "Alex",
  //   "password": "123test",
  //   "age": 15
  // });

  // const user2 = await User.create({
  //   "login": "Robin",
  //   "password": "asd456A",
  //   "age": 20
  // });

  // const group1 = await Group.create({
  //   name: 'Group1',
  //   permissions: ['READ']
  // })

  // group1.setUsers([
  //   user1.id,
  //   user2.id
  // ])

  // User.destroy({
  //   where: {id: "041b7ddb-0e7e-41cc-b7e2-c51ec8e5c0bc"}
  // });

})();

// sequelize.models.User.bulkCreate([{
//   login: 'Alex',
//   password: '123test',
//   age: 15
// }])



export {
  User as UserModel,
  Group as GroupModel
};
