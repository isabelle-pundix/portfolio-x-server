import { NoteInterface } from "../types/note";
import { model, Schema } from "mongoose";

const NoteSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
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

export default model<NoteInterface>("Note", NoteSchema);