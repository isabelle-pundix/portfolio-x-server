import { UserInterface } from "../types/user";
import User from "../model/user.model";

export class UserRepository {

    private User: any;

    constructor() {
        this.User = User;
    }

    public async getUser(id: string): Promise<UserInterface> {
        try {
            const user: UserInterface = await this.User.findById(id).populate('notes');
            return user;

        } catch (error) {
            throw error;
        }
    }

    public async getUsers(): Promise<Array<UserInterface>> {
        try {
            const allUsers: Array<UserInterface> = await this.User.find({}, null, { populate: "notes" });
            return allUsers;

        } catch (error) {
            throw error;
        }
    }

    public async addUser(user: UserInterface): Promise<UserInterface> {
        try {
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            throw error;
        }

    }

    public async updateUser(id: String | Number, body: any): Promise<UserInterface | null> {
        try {
            const updateUser: UserInterface | null = await this.User.findByIdAndUpdate(
                { _id: id },
                body,
                {new:true}
            );
            return updateUser;

        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(id: String | Number): Promise<UserInterface | null> {
        try {
            const deleteUser: UserInterface | null = await this.User.findByIdAndDelete(id);
            return deleteUser;

        } catch (error) {
            throw error;
        }
    }
}