import { Request, Response } from "express";
import { NoteService } from "../service/note.service";
import { NoteInterface } from "../types/note";
import { NoteDto } from "../dto/note.dto";

export class NoteController {

    private noteService = new NoteService();

    constructor() {
        this.noteService = new NoteService();
    }

    public getUserNotes = async (req: Request, res: Response): Promise<void> => {
        try {
            //gets userId from authMiddleware
            const userId: String = req.user._id.toString();
            const userNotes: Array<NoteInterface> = await this.noteService.getUserNotes(userId);
            res.status(200).json(
                {
                    userNotes
                }
            );
        } catch (error) {
            throw error;
        }
    }

    public addUserNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: String = req.user._id.toString();
            const noteData: NoteDto = req.body;
            const newNote: NoteInterface = await this.noteService.addUserNote(userId, noteData);
            res.status(201).json(
                {
                    message: "Note added",
                    note: newNote
                }
            );
        } catch (error) {
            throw error;
        }
    }

    public updateUserNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: String = req.user._id.toString();
            const noteData: NoteDto = req.body;
            const updatedNote: NoteInterface = await this.noteService.updateUserNote(userId, noteData);
            res.status(201).json(
                {
                    message: "Note updated",
                    note: updatedNote
                }
            );
        } catch (error) {
            throw error;
        }
    }
}