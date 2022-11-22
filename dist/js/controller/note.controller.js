"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const note_service_1 = require("../service/note.service");
class NoteController {
    constructor() {
        this.noteService = new note_service_1.NoteService();
        this.getUserNotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //gets userId from authMiddleware
                const userId = req.user._id.toString();
                const userNotes = yield this.noteService.getUserNotes(userId);
                res.status(200).json({
                    userNotes
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.addUserNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id.toString();
                const noteData = req.body;
                const newNote = yield this.noteService.addUserNote(userId, noteData);
                res.status(201).json({
                    message: "Note added",
                    note: newNote
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.updateUserNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id.toString();
                const noteId = req.params.noteId;
                const noteData = req.body;
                const updatedNote = yield this.noteService.updateUserNote(userId, noteId, noteData);
                const userNotes = yield this.noteService.getUserNotes(userId);
                res.status(201).json({
                    message: "Note updated",
                    note: updatedNote,
                    userNotes: userNotes
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteUserNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id.toString();
                const noteId = req.params.noteId;
                const deletedNote = yield this.noteService.deleteUserNote(userId, noteId);
                const userNotes = yield this.noteService.getUserNotes(userId);
                res.status(200).json({
                    message: "Note deleted",
                    note: deletedNote,
                    userNotes: userNotes
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.noteService = new note_service_1.NoteService();
    }
}
exports.NoteController = NoteController;
