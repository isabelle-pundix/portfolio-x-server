import { Document } from "mongoose";
import { NoteInterface } from "./note";

export interface ProtocolInterface extends Document {
    _id: string
    protocolName: string
    note: NoteInterface
}