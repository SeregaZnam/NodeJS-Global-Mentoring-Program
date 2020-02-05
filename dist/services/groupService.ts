import { GroupRepository } from "../database/repositories/GroupRepository";
import { IGroupServise, Group } from "../models/group";

export class GroupService implements IGroupServise {

  constructor(private groupRepository: GroupRepository) {}

  // TODO
  getAll(): any {}

  // TODO
  getById(id: number): any {}

  // TODO
  save(user: Group): any {}

  // TODO
  update(user: Group): any {}

  // TODO
  delete(id: string): any {}

}
