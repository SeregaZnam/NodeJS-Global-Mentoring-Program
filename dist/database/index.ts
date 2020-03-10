import { Config } from '../configs/config';
import { Sequelize, Transaction, TransactionOptions } from 'sequelize';
import { initUserModel, UserModel } from '../modules/user/data-access/entitity/User';
import { initGroupModel, GroupModel } from '../modules/group/data-access/entity/Group';

export interface DBConnect {
   sequelize: Sequelize,
   transaction: (options?: TransactionOptions) => Promise<Transaction>,
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
   const transaction = (options?: TransactionOptions) => sequelize.transaction(options);

   await initUserModel(sequelize);
   await initGroupModel(sequelize);

   [UserModel, GroupModel].forEach(entity => {
      if (entity.associate) {
         entity.associate();
      }
   });

   return { sequelize, transaction, Sequelize };
};
