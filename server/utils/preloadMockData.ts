import fs from 'fs';
import path from 'path';
import { UserModel } from '../modules/user/data-access/entitity/User';
import { GroupModel } from '../modules/group/data-access/entity/Group';

export const preloadMockData = async () => {
   const pathUserSeed = path.resolve(__dirname, '../', 'mocks', 'users.json');
   const pathGroupSeed = path.resolve(__dirname, '../', 'mocks', 'groups.json');
   const users = await fs.promises.readFile(pathUserSeed, { encoding: 'utf-8' });
   const group = await fs.promises.readFile(pathGroupSeed, { encoding: 'utf-8' });

   UserModel.bulkCreate(JSON.parse(users));
   GroupModel.bulkCreate(JSON.parse(group));
};
