export interface User {
    is: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface IUserServise {
    getAll(): User[];
    
    getById(id: number): User;

    getAutoSuggest(limit: number, loginSubstring: string): UserAutoSuggestDTO[];

    save(user: User): boolean;

    update(user: User): boolean;

    delete(id: string): User | undefined;

    loadDataFromFile(): void;

    store(): void
}