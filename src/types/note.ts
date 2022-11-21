import { Document } from "mongoose";
import { UserInterface } from "./user";

export interface NoteInterface extends Document {
    _id: string
    content: string
    group: string
    user: UserInterface
}