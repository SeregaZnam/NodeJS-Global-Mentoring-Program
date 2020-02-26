import * as Joi from '@hapi/joi';
import { GroupService } from '../service';
import { Request, Response } from 'express';
import { GroupDTO } from '../dto/groupDTO';
import { controller, BaseHttpController, httpGet, request, response, httpPut, httpPost, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';

@controller('/group')
export class GroupController extends BaseHttpController {
   constructor(@inject(TYPES.GroupService) private groupService: GroupService) {
      super();
   }

   @httpGet('')
   async getAllGroups(
      @request() req: Request,
      @response() res: Response
   ) {
      const groups = await this.groupService.getAll();

      if (groups) {
         res.status(200).json(groups);
      } else {
         res.status(404).end();
      }
   }

   @httpPut('')
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

         // eslint-disable-next-line no-unused-expressions
         await this.groupService.save(group)
            ? res.status(201).json(true)
            : res.status(404).end();
      } catch (err) {
         res.status(400).json(err.details[0].message).end();
      }
   }

   @httpGet('/:id')
   async getGroup(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const group = await this.groupService.getById(id);

      if (group) {
         res.status(200).json(group);
      } else {
         res.status(404).end();
      }
   }

   @httpPost('/:id')
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

         // eslint-disable-next-line no-unused-expressions
         await this.groupService.update(group)
            ? res.status(201).json(true)
            : res.status(404).end();
      } catch (err) {
         res.status(400).json(err.details[0].message).end();
      }
   }

   @httpDelete('/:id')
   async deleteGroup(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const group = await this.groupService.getById(id);

      if (group && await this.groupService.delete(group.id)) {
         res.status(201).json(true);
      } else {
         res.status(404).end();
      }
   }
}
