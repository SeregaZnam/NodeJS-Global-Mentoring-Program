import express, { Request, Response } from 'express';
import config from './config';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import userGroupRoutes from './routes/userGroupRoutes';

async function bootstrap() {
  const app = express();

  app.use(express.json());

  app.use('/user', userRoutes);
  app.use('/group', groupRoutes);
  app.use('/user-group', userGroupRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).send('Page not found');
  });

  app.listen(config.get("port"), () => {
    console.log(`Server is running at ${config.get("port")}!`);
  });
}

bootstrap();