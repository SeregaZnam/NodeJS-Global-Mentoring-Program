import fs from 'fs';
import path from 'path';
import express from 'express';
import config from './config';
import { createDbConnect } from './database';
import { UserModel } from './database/entities/User';
import { GroupModel } from './database/entities/Group';
import logger from './logger';
import { httpError } from './middleware/httpError';
import { attachRoutes } from './routes';
import { loggerHandler } from './middleware/loggerHandler';

process.on('unhandledRejection', (err) => {
   throw err;
});

const bootstrap = async () => {
   try {
      logger.info('Server starting bootstrap');

      const app = express();
      const db = await createDbConnect(config);

      app.use(express.json());
      app.use(loggerHandler);
      app.use(httpError);

      attachRoutes(app);

      db.sequelize.sync({ force: true })
         .then(async () => {
            const pathUserSeed = path.resolve(__dirname, 'database', 'seeds', 'users.json');
            const pathGroupSeed = path.resolve(__dirname, 'database', 'seeds', 'groups.json');
            const users = await fs.promises.readFile(pathUserSeed, { encoding: 'utf-8' });
            const group = await fs.promises.readFile(pathGroupSeed, { encoding: 'utf-8' });

            UserModel.bulkCreate(JSON.parse(users));
            GroupModel.bulkCreate(JSON.parse(group));
         })
         .then(() => {
            app.listen(config.get('port'), () => {
               console.log(`Server is running at ${config.get('port')}!`);
            });
         });
   } catch (err) {
      logger.error('can not bootstrap server', { err });
      throw err;
   }
};

bootstrap().catch(() => {
   process.exit(1);
});
