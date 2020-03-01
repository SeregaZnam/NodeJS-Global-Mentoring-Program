import * as Joi from '@hapi/joi';
import { GroupService } from '../service';
import { Request, Response } from 'express';
import { GroupDTO } from '../dto/groupDTO';
import {
   httpGet,
   request,
   response,
   httpPut,
   httpPost,
   httpDelete,
   controller,
   BaseHttpController
} from 'inversify-express-utils';
import HttpStatus from 'http-status-codes';
import { inject } from 'inversify';
import { executionTime } from '../../../utils/executionTime';
import { TYPES } from '../../../constants/types';
import { CreateError, NotFoundError, UpdateError, DeleteError } from '../../../errors';
import { Logger } from '../../../logger';

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
   async getAllGroups(
      @request() req: Request,
      @response() res: Response
   ) {
      const groups = await this.groupService.getAll();
      res.status(HttpStatus.OK).json(groups);
   }

   @httpPut('')
   @executionTime()
   async createGroup(
      @request() req: Request,
      @response() res: Response
   ) {
      const schema = Joi.object({
         name: Joi.string()
            .required(),
         permissions: Joi.array()
            .items(Joi.string())
            .required()
      });

      try {
         const value = await schema.validateAsync(req.body);
         const group: GroupDTO = {
            name: value.name,
            permissions: value.permissions
         };

         await this.groupService.save(group);
         res.status(HttpStatus.OK).json(true);
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
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;

      try {
         const group = await this.groupService.getById(id);
         res.status(HttpStatus.OK).json(group);
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
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const group = await this.groupService.getById(id);

      if (!group) {
         res.status(404).end();
         return;
      }

      const schema = Joi.object({
         name: Joi.string()
            .required(),
         permissions: Joi.array()
            .items(Joi.string())
            .required()
      });

      try {
         const value = await schema.validateAsync(req.body);

         group.name = value.name;
         group.permissions = value.permissions;

         await this.groupService.update(group);
         res.status(HttpStatus.OK).json(true);
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
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;

      try {
         const group = await this.groupService.getById(id);
         if (group) {
            await this.groupService.delete(group.id);
            res.status(HttpStatus.OK).json(true);
         }
      } catch {
         throw new DeleteError('Error deleting group');
      }
   }
}
