import GroupModel from "../database/entities/User";
import { GroupRepository } from "../database/repositories/GroupRepository";
import { GroupService } from "../services/groupService";

const groupRepository = new GroupRepository(GroupModel);
const groupService = new GroupService(groupRepository);

// TODO
export const getAllGroups = async () => {};

// TODO
export const createGroup = async () => {};

// TODO
export const getGroup = async () => {};

// TODO
export const updateGroup = async () => {};

// TODO
export const deleteGroup = async () => {};
