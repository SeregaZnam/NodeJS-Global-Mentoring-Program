import {DataTypes, ModelCtor, Model} from "sequelize";
import {sequelize} from "../database";
import fs from "fs";
import path from "path";

sequelize.define('User', {
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

sequelize.define('Group', {
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

sequelize.define('UserGroup', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Group',
      key: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }
}, {
  tableName: "usergroup",
  timestamps: false
});

sequelize.models.Group.belongsToMany(sequelize.models.User, {
   through: sequelize.models.UserGroup,
   as: 'groups',
   foreignKey: 'groupId',
   otherKey: 'userId'
});

sequelize.models.User.belongsToMany(sequelize.models.Group, {
  through: sequelize.models.UserGroup,
  as: 'users',
  foreignKey: 'userId',
  otherKey: 'groupId'
});


sequelize.models.UserGroup.belongsTo(sequelize.models.User, {
  as: 'users',
  foreignKey: 'userId',
  targetKey: 'id'
});

sequelize.models.UserGroup.belongsTo(sequelize.models.Group, {
  as: 'groups',
  foreignKey: 'groupId',
  targetKey: 'id'
});


(async () => {
  await sequelize.sync({force: true})
  
  // const users = fs.readFileSync(path.join(__dirname, '../', 'users.json'), {encoding: "utf-8"});
  // await sequelize.models.User.bulkCreate(JSON.parse(users));

  // const groups = fs.readFileSync(path.join(__dirname, '../', 'groups.json'), {encoding: "utf-8"});
  // await sequelize.models.Group.bulkCreate(JSON.parse(groups));

  sequelize.models.Group.create({
    name: "Group1",
    permissions: ["READ"]
  })

  const users = fs.readFileSync(path.join(__dirname, '../', 'users.json'), {encoding: "utf-8"});
  const usersDB = await sequelize.models.User.bulkCreate(JSON.parse(users));

  console.log(sequelize.models);
  
})();

export default sequelize.models.User as ModelCtor<Model>;
