import { Group } from '../models/group';

export interface IGroupRepository {

    findAll(): Promise<Group[]>;

    getById(id: string): Promise<Group>;

    create(user: Group): void;

    update(user: Group): void;

    destroy(id: string): void;

}
