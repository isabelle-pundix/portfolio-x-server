import { Document } from "mongoose";
import { NoteInterface } from "./note";

export interface RefreshToken {
    refreshToken: string
    _id?: string
}

export interface UserInterface extends Document {
    _id: string
    seq: number
    name: string
    email: string
    walletAddress: string
    password: string
    status: boolean
    notes: Array<NoteInterface>
    refreshToken: RefreshToken[]
}