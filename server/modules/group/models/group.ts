export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
	id: string;
	name: string;
	permissions: Permission[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IGroupService {
	getAll(): Promise<Group[] | undefined>;

	getById(id: string): Promise<Group | undefined>;

	save(user: Group): Promise<Group>;

	update(user: Group): Promise<Group>;

	delete(id: string): Promise<void>;
}
