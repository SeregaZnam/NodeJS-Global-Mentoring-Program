export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
   id: string;
   name: string;
   permissions: Array<Permission>;
}

export interface IGroupService {

   getAll(): Promise<Group[]>;

   getById(id: string): Promise<Group>;

   save(user: Group): Promise<boolean>;

   update(user: Group): Promise<boolean>;

   delete(id: string): Promise<boolean>;

}
