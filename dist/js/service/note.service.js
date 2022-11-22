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
exports.NoteService = void 0;
const note_repository_1 = require("../repository/note.repository");
const note_model_1 = __importDefault(require("../model/note.model"));
class NoteService {
    constructor() {
        this.noteRepository = new note_repository_1.NoteRepository();
    }
    getUserNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = yield this.noteRepository.getUserNotes(userId);
            return notes;
        });
    }
    addUserNote(userId, noteData) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = new note_model_1.default({
                user: userId,
                content: noteData.content,
                group: noteData.group
            });
            const newNote = yield this.noteRepository.addUserNote(userId, note);
            return newNote;
        });
    }
    updateUserNote(userId, noteId, noteData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedNote = yield this.noteRepository.updateUserNote(userId, noteId, noteData);
            return updatedNote;
        });
    }
    deleteUserNote(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedNote = yield this.noteRepository.deleteUserNote(userId, noteId);
            return deletedNote;
        });
    }
}
exports.NoteService = NoteService;
