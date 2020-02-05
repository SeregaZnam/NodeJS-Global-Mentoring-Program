import {DataTypes, ModelCtor, Model} from "sequelize";
import {sequelize} from "../database";

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

sequelize.define('UserGroup', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Group',
      key: 'id'
    }
  }
}, {
  tableName: "usergroup",
  timestamps: false
});

sequelize.models.User.belongsToMany(sequelize.models.Group, {
  through: sequelize.models.UserGroup,
  as: 'users',
  foreignKey: 'userId',
  otherKey: 'groupId'
});

sequelize.models.Group.belongsToMany(sequelize.models.User, {
   through: sequelize.models.UserGroup,
   as: 'groups',
   foreignKey: 'groupId',
   otherKey: 'userId'
});

sequelize.sync({force: true});

export default sequelize.models.User as ModelCtor<Model>;
