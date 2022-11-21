import { NoteInterface } from "../types/note";
import Note from "../model/note.model";
import { UserInterface } from "../types/user";
import User from "../model/user.model";

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

    public async updateUserNote(user: UserInterface, note: NoteInterface): Promise<void> {
        try {
            //update embedded document

            //update collection
        } catch (error) {
            throw error;
        }
    }

    public async deleteUserNote(user: UserInterface, note: NoteInterface): Promise<void> {

    }
}