import { Request, Response } from "express";
import { NoteService } from "../service/note.service";
import { NoteInterface } from "../types/note";
import { NoteDto } from "../dto/note.dto";
import logger from "../logs/logger";

export class NoteController {

    private noteService = new NoteService();

    constructor() {
        this.noteService = new NoteService();
    }

    public getUserNotes = async (req: Request, res: Response): Promise<void> => {
        try {
            //gets userId from authMiddleware
            const userId: String = req.user.toString();
            const userNotes: Array<NoteInterface> = await this.noteService.getUserNotes(userId);
            res.status(200).json(
                {
                    userNotes
                }
            );
        } catch (error) {
            logger.error("Note retrieval error")
            throw error;
        }
    }

    public addUserNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: String = req.user.toString();
            const noteData: NoteDto = req.body;
            const newNote: NoteInterface = await this.noteService.addUserNote(userId, noteData);
            logger.info(`New note added: ${newNote.user.walletAddresses} - ${newNote.id}`)
            res.status(201).json(
                {
                    message: "Note added",
                    note: newNote
                }
            );
        } catch (error) {
            logger.error(`Add note error`);
            throw error;
        }
    }

    public updateUserNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: String = req.user.toString();
            const noteId: String = req.params.noteId;
            const noteData: NoteDto = req.body;
            const updatedNote: NoteInterface | null = await this.noteService.updateUserNote(userId, noteId, noteData);
            const userNotes: Array<NoteInterface> = await this.noteService.getUserNotes(userId);
            logger.info(`Note updated: ${updatedNote?.user.walletAddresses} - ${updatedNote?.id}`);
            res.status(201).json(
                {
                    message: "Note updated",
                    note: updatedNote,
                    userNotes: userNotes
                }
            );
        } catch (error) {
            logger.info(`Note update error`);
            throw error;
        }
    }

    public deleteUserNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: String = req.user.toString();
            const noteId: String = req.params.noteId;
            const deletedNote: NoteInterface | null = await this.noteService.deleteUserNote(userId, noteId);
            const userNotes: Array<NoteInterface> = await this.noteService.getUserNotes(userId);
            logger.info(`Note deleted: ${deletedNote?.user.walletAddresses}`)
            res.status(200).json(
                {
                    message: "Note deleted",
                    note: deletedNote,
                    userNotes: userNotes
                }
            );
        } catch (error) {
            logger.info(`Note delete error`);
            throw error;
        }
    }
}