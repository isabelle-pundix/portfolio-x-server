import { ProtocolInterface } from "../types/protocol";
import { model, Schema } from "mongoose";

const ProtocolSchema: Schema = new Schema(
    {
        note: {
            type: Schema.Types.ObjectId,
            ref: "Note"
        },
        protocolName: {
            type: String,
            required: false
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

export default model<ProtocolInterface>("Protocol", ProtocolSchema);