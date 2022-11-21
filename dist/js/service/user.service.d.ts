import { Request } from "express";
import { UserInterface } from "../types/user";
import { UserDto } from "../dto/user.dto";
export declare class UserService {
    private userRepository;
    constructor();
    getUsers(): Promise<UserInterface[]>;
    addUser(userData: UserDto): Promise<UserInterface>;
    updateUser(req: Request): Promise<UserInterface | null>;
    deleteUser(req: Request): Promise<UserInterface | null>;
}
