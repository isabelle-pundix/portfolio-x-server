import { Request, Response } from "express";
import { UserInterface } from "../types/user";
import { UserService } from "../service/user.service";
import { UserDto } from "../dto/user.dto";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.user
            const user: UserInterface = await this.userService.getUserById(id as string);
            res.status(200).json({ user });
        } catch (error) {
            throw error;
        }
    }

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users: Array<UserInterface> = await this.userService.getUsers();
            res.status(200).json(
                {
                    users
                }
            );
        } catch (error) {
            throw error;
        }
    }

    public addUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData: UserDto = req.body;
            const newUser: UserInterface = await this.userService.addUser(userData);
            const allUsers: Array<UserInterface> = await this.userService.getUsers();
            res.status(201).json(
                {
                    message: "User added",
                    user: newUser,
                    users: allUsers
                }
            );
        } catch (error) {
            throw error;
        }
    }

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const updateUser: UserInterface | null = await this.userService.updateUser(req);
            res.status(200).json(
                {
                    message: "User updated",
                    user: updateUser
                }
            );
        } catch (error) {
            console.log("Err");
            throw error;
        }
    }

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const deleteUser: UserInterface | null = await this.userService.deleteUser(req);
            const allUsers: Array<UserInterface> = await this.userService.getUsers();
            res.status(200).json(
                {
                    message: "User deleted",
                    user: deleteUser,
                    users: allUsers
                }
            );
        } catch (error) {
            throw error;
        }
    }

}