import { Document } from "mongoose";
export interface UserInterface extends Document {
    _id: string;
    // name: string;
    // email: string;
    // password: string;
    status: boolean;
}
