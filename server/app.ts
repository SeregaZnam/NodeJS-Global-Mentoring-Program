import 'reflect-metadata';
import express from 'express';
import config from './configs/config';
import logger from './logger';
import bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { httpError } from './middlewares/httpError';
import { loggerHandler } from './middlewares/loggerHandler';
import { bindings } from './inversify.config';
import { Container } from 'inversify';
import { preloadMockData } from './utils/preloadMockData';

process.on('unhandledRejection', (err) => {
   throw err;
});

const bootstrap = async () => {
   try {
      logger.info('Server starting bootstrap');
      const container = new Container();
      await container.loadAsync(bindings);
      const server = new InversifyExpressServer(container);

      server.setConfig((app) => {
         app.use(bodyParser.json());
         app.use(express.json());
         app.use(loggerHandler);
         app.use(httpError);
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
