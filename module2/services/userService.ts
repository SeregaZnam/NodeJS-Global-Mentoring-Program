import { IUserServise } from "../models/user";

export class UserService implements IUserServise {
    public getAll(): User[] {}
    
    public getById(id: number): User {}

    public getAutoSuggest(limit: number, loginSubstring: string): UserAutoSuggestDTO[] {}

    public save(user: User): boolean {}

    public update(user: User): boolean {}

    public delete(id: string): User | undefined {}

    private loadDataFromFile(): void;

    public store(): void {

    }
}
