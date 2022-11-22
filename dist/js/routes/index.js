"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const note_controller_1 = require("../controller/note.controller");
const user_controller_1 = require("../controller/user.controller");
const logIn_dto_1 = require("../dto/logIn.dto");
const note_dto_1 = require("../dto/note.dto");
const user_dto_1 = require("../dto/user.dto");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const userController = new user_controller_1.UserController();
const authController = new auth_controller_1.AuthController();
const noteController = new note_controller_1.NoteController();
const router = (0, express_1.Router)();
//Test CRUD only
router.get("/getusers", auth_middleware_1.authMiddleware, userController.getUsers);
router.post("/adduser", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(user_dto_1.UserDto), userController.addUser);
router.put("/updateuser/:id", auth_middleware_1.authMiddleware, userController.updateUser);
router.delete("/deleteuser/:id", auth_middleware_1.authMiddleware, userController.deleteUser);
//Auth
router.post("/registeruser", (0, validation_middleware_1.validationMiddleware)(user_dto_1.UserDto), authController.registerNewUser);
router.post("/login", (0, validation_middleware_1.validationMiddleware)(logIn_dto_1.LogInDto), authController.logIn);
router.post("/logout", authController.logOut);
//Notes
router.get("/getnotes", auth_middleware_1.authMiddleware, noteController.getUserNotes);
router.post("/addnote", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(note_dto_1.NoteDto), noteController.addUserNote);
router.put("/updatenote/:noteId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(note_dto_1.NoteDto), noteController.updateUserNote);
router.delete("/deletenote/:noteId", auth_middleware_1.authMiddleware, noteController.deleteUserNote);
exports.default = router;
