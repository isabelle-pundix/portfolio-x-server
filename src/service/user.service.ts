import { NextFunction, Request } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserInterface } from "../types/user";
import User from "../model/user.model";
import { UserDto } from "../dto/user.dto";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getUsers() {
        return await this.userRepository.getUsers();
    }

    public async addUser(userData: UserDto): Promise<UserInterface> {
        //const body = req.body as Pick<UserInterface, "name" | "email" | "status">;
        const user: UserInterface = new User({
            name: userData.name,
            email: userData.email,
            walletAddress: userData.walletAddress,
            password: userData.password,
            status: userData.status
        });
        const newUser: UserInterface = await this.userRepository.addUser(user);
        return newUser;
    }

    public async updateUser(req: Request): Promise<UserInterface | null> {
        const { params: { id }, body } = req;
        const updateUser: UserInterface | null = await this.userRepository.updateUser(id, body);
        return updateUser;
    }

    public async deleteUser(req: Request): Promise<UserInterface | null> {
        const deleteUser: UserInterface | null = await this.userRepository.deleteUser(req.params.id);
        return deleteUser;
    }
}