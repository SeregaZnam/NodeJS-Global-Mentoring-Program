import { Config } from '../configs/config';
import { Sequelize } from 'sequelize';
import { initUserModel, UserModel } from '../modules/user/data-access/entitity/User';
import { initGroupModel, GroupModel } from '../modules/group/data-access/entity/Group';

export interface DBConnect {
   sequelize: Sequelize,
   Sequelize: typeof Sequelize
}

export const createDbConnect = async (config: Config): Promise<DBConnect> => {
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
