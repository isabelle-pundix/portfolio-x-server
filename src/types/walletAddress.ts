import { Document } from "mongoose"; 
import { UserInterface } from "./user";

export interface WalletAddressInterface extends Document {
    _id: string
    name: string 
    walletAddress: string
    user: UserInterface
}