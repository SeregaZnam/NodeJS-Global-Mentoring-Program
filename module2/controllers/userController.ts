import { UserService } from '../services/userService';
import * as Joi from '@hapi/joi';
import path from 'path';
import util from 'util';
import fs from 'fs';
import { User } from '../models/user';
import { UserDTO } from '../dto/userDTO';

export const getAutoSuggestUsers = async (req: any, res: any) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const users = await new UserService().getAutoSuggest(loginSubstring, limit);

    res.status(200).json(users);
};

export const createUser = async (req: any, res: any) => {
    const user = new UserDTO();

    const schema = Joi.object({
        login: Joi.string()
            .required(),
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[A-Za-z])/)
            .required(),
        age: Joi.number()
            .min(4)
            .max(130)
            .required()
    });

    try {
        const value = await schema.validateAsync(req.body);

        user.login = value.login;
        user.password = value.password;
        user.age = value.age;

        await new UserService().save(user)
            ? res.status(201).json(true)
            : res.status(404).end();
    } catch(err) {
        res.status(400).json(err.details[0].message).end();
    }
};

export const getUser = async (req: any, res: any) => {
    const id = req.params.id;
    const user = await new UserService().getById(id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).end();
    }
};

export const updateUser = async (req: any, res: any) => {
    const id = req.params.id;
    const user = await new UserService().getById(id);

    if (!user) {
        res.status(404).end();
        return;
    }

    const schema = Joi.object({
        login: Joi.string()
            .required(),
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[A-Za-z])/)
            .required(),
        age: Joi.number()
            .min(4)
            .max(130)
            .required()
    });

    try {
        const value = await schema.validateAsync(req.body);

        user.login = value.login;
        user.password = value.password;
        user.age = value.age;

        await new UserService().update(user)
            ? res.status(201).json(true)
            : res.status(404).end();
    } catch(err) {
        res.status(400).json(err.details[0].message).end();
    }
};

export const deleteUser = async (req: any, res: any) => {
    const id = req.params.id;
    const user = await new UserService().getById(id);

    if (user && await new UserService().delete(user.id)) {
        res.status(201).json(true);
    } else {
        res.status(404).end();
    }
};
