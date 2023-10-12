import { Document } from "mongoose";
import { NoteInterface } from "./note";
import { WalletAddressInterface } from "./walletAddress";

export interface RefreshToken {
    refreshToken: string
    _id?: string
}

export interface UserInterface extends Document {
    _id: string
    seq: number
    status: boolean
    // name: string
    // email: string
    // password: string
    walletAddresses: WalletAddressInterface[]
    notes: NoteInterface[]
    refreshToken: RefreshToken[]
}