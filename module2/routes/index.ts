import userRoutes from './userRoutes';
import groupRoutes from './groupRoutes';
import userGroupRoutes from './userGroupRoutes';
import { Application } from 'express';

export const attachRoutes = (app: Application) => {
   app.use('/user', userRoutes);
   app.use('/group', groupRoutes);
   app.use('/user-group', userGroupRoutes);
};
