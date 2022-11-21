import { UserInterface } from "../types/user";
export declare class UserRepository {
    private User;
    constructor();
    getUsers(): Promise<Array<UserInterface>>;
    addUser(user: UserInterface): Promise<UserInterface>;
    updateUser(id: String | Number, body: any): Promise<UserInterface | null>;
    deleteUser(id: String | Number): Promise<UserInterface | null>;
}
