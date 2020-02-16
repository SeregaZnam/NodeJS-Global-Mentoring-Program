import * as Joi from '@hapi/joi';
import { Request, Response } from "express";
import { UserGroupService } from '../services/userGroupService';
import { UserGroupModel, UserModel, GroupModel } from '../database/entities/User';
import { UserRepository } from '../database/repositories/UserRepository';
import { GroupRepository } from '../database/repositories/GroupRepository';
import { UserGroupRepository } from '../database/repositories/UserGroupRepository';

const userGroupService = new UserGroupService(
    new GroupRepository(GroupModel),
    new UserRepository(UserModel),
    new UserGroupRepository(UserGroupModel)
);

export const createUserGroup = async (req: Request, res: Response) => {
    const schema = Joi.object({
        userId: Joi.string()
            .required(),
        groupId: Joi.string()
            .required()
    });

    try {
        const value = await schema.validateAsync(req.body);
        await userGroupService.save(value.userId, value.groupId)
            ? res.status(201).json(true)
            : res.status(404).end();
    } catch(err) {
        res.status(400).json(err.details[0].message).end();
    }
}