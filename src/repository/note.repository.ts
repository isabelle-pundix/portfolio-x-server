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

    public async getNotesByGroup(groupName: String): Promise<Array<NoteInterface>> {
        try {
            const notesByGroup: Array<NoteInterface> = this.Note.find({ group: groupName });
            return notesByGroup;
        } catch (error) {
            throw error;
        }
    }

    public async addUserNote(userId: String, note: NoteInterface): Promise<NoteInterface> {
        try {
            //Embed to User
            let user: UserInterface = await this.User.findById(userId);
            user.notes.push(note);
            user.save();

            //Save to notes collection
            await note.save();
            const newNote: NoteInterface = this.Note.findById(note._id);
            return newNote;
        } catch (error) {
            throw error;
        }
    }

    public async updateUserNote(userId: String, noteId: String, note: NoteDto): Promise<NoteInterface | null> {
        try {
            //update embedded document
            const updatedUserNote: UserInterface | null = await this.User.findByIdAndUpdate(
                { _id: userId, "notes.id": noteId },
                {
                    $set: {
                        content: note.content,
                        group: note.group
                    }
                }
            );
            //update collection
            const updatedNote: NoteInterface | null = await this.Note.findByIdAndUpdate(
                { _id: noteId },
                {
                    $set: {
                        content: note.content,
                        group: note.group
                    }
                }
            );
            return updatedNote;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUserNote(userId: String, noteId: String): Promise<NoteInterface | null> {
        try {
            //delete embedded document
            const deletedUserNote: UserInterface | null = await this.User.findByIdAndUpdate(
                { _id: userId, "notes.id": noteId },
                {
                    $pull: {
                        notes: { _id: noteId }
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