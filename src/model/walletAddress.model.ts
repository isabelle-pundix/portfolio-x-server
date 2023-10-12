import { WalletAddressInterface } from "../types/walletAddress";
import { model, Schema } from "mongoose"

const WalletAddressSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        walletAddress: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, 
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
); 

export default model<WalletAddressInterface>("WalletAddress", WalletAddressSchema);