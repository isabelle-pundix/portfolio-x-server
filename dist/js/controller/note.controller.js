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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const note_service_1 = require("../service/note.service");
const logger_1 = __importDefault(require("../logs/logger"));
class NoteController {
    constructor() {
        this.noteService = new note_service_1.NoteService();
        this.getUserNotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //gets userId from authMiddleware
                const userId = req.user.toString();
                const userNotes = yield this.noteService.getUserNotes(userId);
                res.status(200).json({
                    userNotes
                });
            }
            catch (error) {
                logger_1.default.error("Note retrieval error");
                throw error;
            }
        });
        this.addUserNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.toString();
                const noteData = req.body;
                const newNote = yield this.noteService.addUserNote(userId, noteData);
                logger_1.default.info(`New note added: ${newNote.user.walletAddress} - ${newNote.id}`);
                res.status(201).json({
                    message: "Note added",
                    note: newNote
                });
            }
            catch (error) {
                logger_1.default.error(`Add note error`);
                throw error;
            }
        });
        this.updateUserNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.toString();
                const noteId = req.params.noteId;
                const noteData = req.body;
                const updatedNote = yield this.noteService.updateUserNote(userId, noteId, noteData);
                const userNotes = yield this.noteService.getUserNotes(userId);
                logger_1.default.info(`Note updated: ${updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.user.walletAddress} - ${updatedNote === null || updatedNote === void 0 ? void 0 : updatedNote.id}`);
                res.status(201).json({
                    message: "Note updated",
                    note: updatedNote,
                    userNotes: userNotes
                });
            }
            catch (error) {
                logger_1.default.info(`Note update error`);
                throw error;
            }
        });
        this.deleteUserNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.toString();
                const noteId = req.params.noteId;
                const deletedNote = yield this.noteService.deleteUserNote(userId, noteId);
                const userNotes = yield this.noteService.getUserNotes(userId);
                logger_1.default.info(`Note deleted: ${deletedNote === null || deletedNote === void 0 ? void 0 : deletedNote.user.walletAddress}`);
                res.status(200).json({
                    message: "Note deleted",
                    note: deletedNote,
                    userNotes: userNotes
                });
            }
            catch (error) {
                logger_1.default.info(`Note delete error`);
                throw error;
            }
        });
        this.noteService = new note_service_1.NoteService();
    }
}
exports.NoteController = NoteController;
