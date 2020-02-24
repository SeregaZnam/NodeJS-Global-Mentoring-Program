import { Application } from 'express';
import userRoutes from './modules/user/routes';
import groupRoutes from './modules/group/routes';
import userGroupRoutes from './modules/user-group/routes';

export const attachRoutes = (app: Application) => {
   app.use('/user', userRoutes);
   app.use('/group', groupRoutes);
   app.use('/user-group', userGroupRoutes);
};
