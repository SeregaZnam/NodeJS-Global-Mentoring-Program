import { Sequelize } from 'sequelize';
import { Config } from '../config';
import { initUserModel, UserModel } from '../modules/user/data-access/entitity/User';
import { initGroupModel, GroupModel } from '../modules/group/data-access/entity/Group';

export const createDbConnect = async (config: Config) => {
   const { host, database, password, user, port } = config.get('db');
   const sequelize = new Sequelize(database, user, password, {
      dialect: 'postgres',
      host,
      port,
      dialectOptions: {
         ssl: true
      }
   });

   await initUserModel(sequelize);
   await initGroupModel(sequelize);

   [UserModel, GroupModel].forEach((entiry: any) => {
      if (entiry.associate) {
         entiry.associate();
      }
   });

   return { sequelize, Sequelize };
};
