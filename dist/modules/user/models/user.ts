export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    createdAt?: Date;
    updatedAt?: Date;
}
