export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
   id: string;
   name: string;
   permissions: Array<Permission>;
}

export interface IGroupServise {
   getAll(): Group[];
   
   getById(id: number): Promise<Group | undefined>;

   save(user: Group): Promise<boolean>;

   update(user: Group): Promise<boolean>;

   delete(id: string): Promise<boolean>;
}
