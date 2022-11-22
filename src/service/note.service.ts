import { NoteRepository } from "../repository/note.repository";
import Note from "../model/note.model";
import { NoteDto } from "../dto/note.dto";
import { NoteInterface } from "../types/note";

export class NoteService {

    private noteRepository: NoteRepository;

    constructor() {
        this.noteRepository = new NoteRepository();
    }

    public async getUserNotes(userId: String): Promise<Array<NoteInterface>> {
        const notes: Array<NoteInterface> = await this.noteRepository.getUserNotes(userId)
        return notes;
    }

    public async addUserNote(userId: String, noteData: NoteDto): Promise<NoteInterface> {
        const note: NoteInterface = new Note({
            user: userId,
            content: noteData.content,
            group: noteData.group
        });
        const newNote: NoteInterface = await this.noteRepository.addUserNote(userId, note);
        return newNote;
    }

    public async updateUserNote(userId: String, noteId: String, noteData: NoteDto): Promise<NoteInterface | null> {
        const updatedNote: NoteInterface | null = await this.noteRepository.updateUserNote(userId, noteId, noteData);
        return updatedNote;
    }

    public async deleteUserNote(userId: String, noteId: String): Promise<NoteInterface | null> {
        const deletedNote: NoteInterface | null = await this.noteRepository.deleteUserNote(userId, noteId);
        return deletedNote;
    }
}