import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import config from './config';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import userGroupRoutes from './routes/userGroupRoutes';
import { createDbConnect } from './database';
import { UserModel } from './database/entities/User';
import { GroupModel } from './database/entities/Group';

const bootstrap = async () => {
   const app = express();
   const db = await createDbConnect(config);

   app.use(express.json());

   app.use('/user', userRoutes);
   app.use('/group', groupRoutes);
   app.use('/user-group', userGroupRoutes);

   app.use((req: Request, res: Response) => {
      res.status(404).send('Page not found');
   });

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
};

bootstrap();
