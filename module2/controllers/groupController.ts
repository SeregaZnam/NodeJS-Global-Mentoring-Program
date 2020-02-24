import * as Joi from '@hapi/joi';
import { GroupService } from '../services/groupService';
import { Request, Response } from 'express';
import { GroupDTO } from '../dto/groupDTO';

export const getAllGroups = async (req: Request, res: Response) => {
   const groups = await GroupService.getAll();

   if (groups) {
      res.status(200).json(groups);
   } else {
      res.status(404).end();
   }
};

export const createGroup = async (req: Request, res: Response) => {
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
      await GroupService.save(group)
         ? res.status(201).json(true)
         : res.status(404).end();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
   }
};

export const getGroup = async (req: Request, res: Response) => {
   const id = req.params.id;
   const group = await GroupService.getById(id);

   if (group) {
      res.status(200).json(group);
   } else {
      res.status(404).end();
   }
};

export const updateGroup = async (req: Request, res: Response) => {
   const id = req.params.id;
   const group = await GroupService.getById(id);

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
      await GroupService.update(group)
         ? res.status(201).json(true)
         : res.status(404).end();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
   }
};

export const deleteGroup = async (req: Request, res: Response) => {
   const id = req.params.id;
   const group = await GroupService.getById(id);

   if (group && await GroupService.delete(group.id)) {
      res.status(201).json(true);
   } else {
      res.status(404).end();
   }
};
