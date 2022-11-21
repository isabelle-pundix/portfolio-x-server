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
exports.NoteRepository = void 0;
const note_model_1 = __importDefault(require("../model/note.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
class NoteRepository {
    constructor() {
        this.Note = note_model_1.default;
        this.User = user_model_1.default;
    }
    getUserNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userNotes = this.Note.find({ user: userId });
                return userNotes;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNotesByGroup(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notesByGroup = this.Note.find({ group: groupName });
                return notesByGroup;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addUserNote(userId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Embed to User
                let user = yield this.User.findById(userId);
                user.notes.push(note);
                user.save();
                //Save to notes collection
                yield note.save();
                const newNote = this.Note.findById(note._id);
                return newNote;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUserNote(user, note) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteUserNote(user, note) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.NoteRepository = NoteRepository;
