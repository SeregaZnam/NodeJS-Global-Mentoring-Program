import { AsyncContainerModule, interfaces } from 'inversify';
import { TYPES } from './constants/types';
import { UserService } from './modules/user/service';
import { GroupService } from './modules/group/service';
import { UserGroupService } from './modules/user-group/service';
import { GroupRepository } from './modules/group/data-access/repository/GroupRepository';
import { UserRepository } from './modules/user/data-access/repository/UserRepository';

export const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
   await import('./modules/user/controller');
   await import('./modules/group/controller');
   await import('./modules/user-group/controller');

   bind<UserService>(TYPES.UserService).to(UserService);
   bind<GroupService>(TYPES.GroupService).to(GroupService);
   bind<UserGroupService>(TYPES.UserGroupService).to(UserGroupService);

   bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
   bind<GroupRepository>(TYPES.GroupRepository).to(GroupRepository);
});
