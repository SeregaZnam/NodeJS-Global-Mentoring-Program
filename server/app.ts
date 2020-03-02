import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import logger from './logger';
import config from './configs/config';
import bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { httpError } from './middlewares/httpError';
import { loggerHandler } from './middlewares/loggerHandler';
import { bindings } from './inversify.config';
import { Container } from 'inversify';
import { preloadMockData } from './utils/preloadMockData';
import { initializeStrategies } from './auth';

process.on('unhandledRejection', (err) => {
   throw err;
});

export const container = new Container();

const bootstrap = async () => {
   try {
      logger.info('Server starting bootstrap');
      await container.loadAsync(bindings);
      const server = new InversifyExpressServer(container);

      server.setConfig(async (app) => {
         app.use(cors());
         app.use(helmet());
         app.use(bodyParser.json());
         app.use(express.json());
         app.use(loggerHandler);
         app.use(httpError);
         await initializeStrategies();
      });

      const app = server.build();

      await preloadMockData();

      app.listen(config.get('port'), () => {
         logger.info(`Server is running at ${config.get('port')}!`);
      });
   } catch (err) {
      logger.error('can not bootstrap server', { err });
      throw err;
   }
};

bootstrap().catch(() => {
   process.exit(1);
});
