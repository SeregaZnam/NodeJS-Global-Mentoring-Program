import { GroupRepository } from "../database/repositories/GroupRepository";
import { UserRepository } from "../database/repositories/UserRepository";
import { UserGroupRepository } from "../database/repositories/UserGroupRepository";

export class UserGroupService {
    constructor(
        private groupRepository: GroupRepository,
        private userRepository: UserRepository,
        private userGroupRepository: UserGroupRepository
    ) {}

    async save(userId: string, groupId: string): Promise<boolean> {
        try {
            const group = await this.groupRepository.getById(groupId);
            const user = await this.userRepository.getById(userId);
            await this.userGroupRepository.create(user.id, group.id);
            return true;
        } catch {
            return false;
        }
    }
}
