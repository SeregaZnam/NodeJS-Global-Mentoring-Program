import * as Joi from '@hapi/joi';
import { Request, Response } from "express";
import { UserGroupService } from '../services/userGroupService';
import { UserModel, GroupModel } from '../database/entities/User';
import { UserRepository } from '../database/repositories/UserRepository';
import { GroupRepository } from '../database/repositories/GroupRepository';
import { sequelize } from '../database/database';

const userGroupService = new UserGroupService(
    new GroupRepository(GroupModel),
    new UserRepository(UserModel),
);

export const createUserGroup = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
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
        transaction.commit();
    } catch(err) {
        transaction.rollback();
        res.status(400).json(err.details[0].message).end();
    }
}