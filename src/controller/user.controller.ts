import { NextFunction, Request, Response } from "express";
import { UserInterface } from "../types/user";
import { UserService } from "../service/user.service";
import { UserDto } from "../dto/user.dto";
import logger from "../logs/logger";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.user
            const user: UserInterface = await this.userService.getUserById(id as string);
            logger.info(`App loaded with user: ${user.walletAddress}`);
            res.status(200).json({ user });
        } catch (error) {
            logger.error(`Get User error`);
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
            logger.error(`Add user error`);
            throw error;
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updatedUser: UserInterface | null = await this.userService.updateUser(req);
            logger.info(`User updated: ${updatedUser?.walletAddress} - ${JSON.stringify(Object.keys(req.body.fieldToEdit)[0])}`);
            res.status(200).json(
                {
                    message: "User updated",
                    user: updatedUser
                }
            );
        } catch (error) {
            logger.error(`User update error`);
            next(error)
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
            logger.error("Delete user error");
            throw error;
        }
    }

}