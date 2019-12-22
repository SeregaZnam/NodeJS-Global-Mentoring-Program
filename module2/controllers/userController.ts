import { UserService } from "../services/userService";
// import { UserDTO } from "../dto/userDTO";
import path from "path";
import util from 'util';
import fs from 'fs';
import { User, UserDB } from "../models/user";

export const getAutoSuggestUsers = async (req: any, res: any) => {
    const limit = req.query.limit;
    const loginSubstring = req.query.loginSubstring;
    const users = await new UserService().getAutoSuggest(limit, loginSubstring);

    res.status(200).json(users);
};

export const createUser = async (req: any, res: any) => {
    const user = new UserDB();

    user.login = req.body.login;
    user.password = req.body.password;
    user.age = req.body.age;
    
    if (await new UserService().save(user)) {
        res.status(201).json(true);
    } else {
        res.status(404).end();
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

    if (user) {
        user.login = req.body.login;
        user.password = req.body.password;
        user.age = req.body.age;
        
        if (await new UserService().update(user)) {
            res.status(201).json(true);
        } else {
            res.status(404).end();
        }
    } else {
        res.status(404).end();
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
