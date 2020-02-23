export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
}

export interface IUserServise {

    getAll(): Promise<User[]>;

    getById(id: number): Promise<User | undefined>;

    getAutoSuggest(loginSubstring: string, limit: number): Promise<User[]>;

    save(user: User): Promise<boolean>;

    update(user: User): Promise<boolean>;

    delete(id: string): Promise<boolean>;

}
