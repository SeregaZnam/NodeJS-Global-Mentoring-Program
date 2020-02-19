import {DataTypes, ModelCtor, Model} from "sequelize";
import {sequelize} from "../database";

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

// const UserGroup: any = sequelize.define('UserGroup', {
//   id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     primaryKey: true,
//     defaultValue: DataTypes.UUIDV4
//   },
//   userId: {
//     type: DataTypes.UUID,
//   },
//   groupId: {
//     type: DataTypes.UUID,
//   }
//   }, {
//     tableName: "user-group",
//     timestamps: false
// });

sequelize.models.User.belongsToMany(Group, {
  through: 'user-group'
  // as: 'users',
  // foreignKey: 'userId',
  // otherKey: 'groupId'
});

sequelize.models.Group.belongsToMany(User, {
   through: 'user-group',
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

  // await group1.setUsers([
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
  Group as GroupModel,
  // UserGroup as UserGroupModel
};
