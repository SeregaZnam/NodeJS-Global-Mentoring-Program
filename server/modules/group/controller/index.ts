import { Request } from 'express';
import { GroupDTO } from '../dto/groupDTO';
import { GroupService } from '../service';
import {
   httpGet,
   request,
   httpPut,
   httpPost,
   httpDelete,
   controller,
   BaseHttpController,
   requestParam,
   requestBody
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { executionTime } from '../../../utils/executionTime';
import { TYPES } from '../../../constants/types';
import {
   CreateError,
   NotFoundError,
   UpdateError,
   DeleteError
} from '../../../errors';
import { Logger } from '../../../logger';
import { GroupSchema } from '../schemas/groupSchemas';
import { validateBody } from '../../../utils/validate';

@controller('/group')
export class GroupController extends BaseHttpController {
   constructor(
      @inject(TYPES.Logger) private logger: Logger,
      @inject(TYPES.GroupService) private groupService: GroupService
   ) {
      super();
   }

   @httpGet('')
   @executionTime()
   async getAllGroups() {
      try {
         const groups = await this.groupService.getAll();
         return this.json(groups);
      } catch (err) {
         this.logger.error('Error get users with suggest', {
            err,
            method: 'getAllGroups'
         });
         throw new NotFoundError('Error getting groups');
      }
   }

   @httpPut('')
   @executionTime()
   async createGroup(
      @request() req: Request
   ) {
      try {
         const value = await validateBody(GroupSchema, req.body);
         const group: GroupDTO = {
            name: value.name,
            permissions: value.permissions
         };

         const createdGroup = await this.groupService.save(group);
         return this.json(createdGroup);
      } catch (err) {
         this.logger.error('Error create request', {
            method: 'createGroup',
            params: {
               name: req.body.name,
               permissions: req.body.permissions
            }
         });
         throw new CreateError('Error create group');
      }
   }

   @httpGet('/:id')
   @executionTime()
   async getGroup(
      @requestParam('id') id: string
   ) {
      try {
         const group = await this.groupService.getById(id);
         return this.json(group);
      } catch {
         this.logger.error('Error getting user', {
            method: 'getGroup',
            params: { id }
         });
         throw new NotFoundError('Error getting group');
      }
   }

   @httpPost('/:id')
   @executionTime()
   async updateGroup(
      @requestBody() body: any,
      @requestParam('id') id: string
   ) {
      const group = await this.groupService.getById(id);

      if (!group) {
         throw new NotFoundError('Group not found');
      }

      try {
         const value = await validateBody(GroupSchema, body);

         group.name = value.name;
         group.permissions = value.permissions;

         const updatedGroup = await this.groupService.update(group);
         return this.json(updatedGroup);
      } catch {
         this.logger.error('Error updating group', {
            method: 'updateGroup',
            params: { id }
         });
         throw new UpdateError('Error update group');
      }
   }

   @httpDelete('/:id')
   @executionTime()
   async deleteGroup(
      @requestParam('id') id: string
   ) {
      try {
         const group = await this.groupService.getById(id);
         if (group) {
            await this.groupService.delete(group.id);
            return this.json(true);
         }
      } catch {
         throw new DeleteError('Error deleting group');
      }
   }
}
