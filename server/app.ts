import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import express from 'express';
import config from './configs/config';
import logger from './logger';
import bodyParser from 'body-parser';
import { createDbConnect } from './database';
import { UserModel } from './modules/user/data-access/entitity/User';
import { GroupModel } from './modules/group/data-access/entity/Group';
import { InversifyExpressServer } from 'inversify-express-utils';
import { httpError } from './middleware/httpError';
import { loggerHandler } from './middleware/loggerHandler';
import { bindings } from './inversify.config';
import { Container } from 'inversify';

process.on('unhandledRejection', (err) => {
   throw err;
});

const bootstrap = async () => {
   try {
      logger.info('Server starting bootstrap');
      const container = new Container();
      await container.loadAsync(bindings);
      const inversifyExpressServer = new InversifyExpressServer(container);
      const db = await createDbConnect(config);

      // eslint-disable-next-line no-shadow
      inversifyExpressServer.setConfig((app) => {
         app.use(bodyParser.json());
      });

      const server = inversifyExpressServer.build();
      server.use(express.json());
      server.use(loggerHandler);
      server.use(httpError);

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
            server.listen(config.get('port'), () => {
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
