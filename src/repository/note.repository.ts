import { NoteInterface } from "../types/note";
import Note from "../model/note.model";
import { UserInterface } from "../types/user";
import User from "../model/user.model";
import { NoteDto } from "../dto/note.dto";

export class NoteRepository {

    private Note: any;
    private User: any;

    constructor() {
        this.Note = Note;
        this.User = User;
    }

    public async getUserNotes(userId: String): Promise<Array<NoteInterface>> {
        try {
            const userNotes: Array<NoteInterface> = this.Note.find({ user: userId });
            return userNotes;
        } catch (error) {
            throw error;
        }
    }

    public async addUserNote(userId: String, note: NoteInterface): Promise<NoteInterface> {
        try {
            //Embed to User
            let user: UserInterface = await this.User.findById(userId);
            user.notes.push(note);
            await user.save();

            //Save to notes collection
            await note.save();
            const newNote: NoteInterface = await this.Note.findById(note._id);
            newNote.user.walletAddresses = user.walletAddresses;
            return newNote;
        } catch (error) {
            throw error;
        }
    }

    public async updateUserNote(userId: String, noteId: String, note: NoteDto): Promise<NoteInterface | null> {
        try {
            // const user: UserInterface = await this.User.findById(userId)
            //update embedded document
            const updatedUserNote: UserInterface | null = await this.User.findByIdAndUpdate(
                { _id: userId, "notes.id": noteId },
                {
                    $set: {
                        content: note.content,
                    }
                }
            );
            //update collection
            const updatedNote: NoteInterface | null = await this.Note.findByIdAndUpdate(
                { _id: noteId },
                {
                    $set: {
                        content: note.content,
                    }
                }
            );
            if (updatedNote && updatedUserNote) {
                updatedNote.user.walletAddresses = updatedUserNote.walletAddresses
            }
            return updatedNote;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUserNote(userId: String, noteId: String): Promise<NoteInterface | null> {
        try {
            //delete embedded document
            const deletedUserNote: UserInterface | null = await this.User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        notes: noteId
                    }
                },
                { new: true }
            );
            //delete from collection
            const deletedNote: NoteInterface | null = await this.Note.findByIdAndDelete(noteId);
            return deletedNote;
        } catch (error) {
            throw error;
        }
    }
}