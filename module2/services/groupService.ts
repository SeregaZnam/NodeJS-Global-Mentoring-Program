import { GroupRepository } from "../database/repositories/GroupRepository";
import { IGroupServise, Group } from "../models/group";
import { GroupDTO } from "../dto/groupDTO";

export class GroupService implements IGroupServise {

  constructor(private groupRepository: GroupRepository) {}

  async getAll(): Promise<any> {
    try {
      const groups = await this.groupRepository.findAll();
      return groups;
    } catch {
        throw new Error('Error receiving groups');
    }
  }

  async getById(id: string): Promise<Group> {
    return await this.groupRepository.getById(id);
  }

  async save(group: GroupDTO): Promise<boolean> {
    try {
      await this.groupRepository.create(group);
      return true;
    } catch {
      return false;
    }
  }

  async update(group: Group): Promise<boolean> {
    try {
      await this.groupRepository.update(group);
      return true;
    } catch {
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.groupRepository.destroy(id);
      return true;
    } catch {
      return false;
    }
  }

}
