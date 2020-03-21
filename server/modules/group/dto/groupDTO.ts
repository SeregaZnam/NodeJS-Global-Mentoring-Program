import { Permission } from '../models/group';

export interface GroupDTO {
	name: string;
	permissions: Permission[];
}
