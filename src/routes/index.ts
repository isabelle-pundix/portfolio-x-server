import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { NoteController } from "../controller/note.controller";
import { UserController } from "../controller/user.controller";
import { LogInDto } from "../dto/logIn.dto";
import { NoteDto } from "../dto/note.dto";
import { UserDto } from "../dto/user.dto";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";

const userController = new UserController();
const authController = new AuthController();
const noteController = new NoteController();
const router: Router = Router();

//Test CRUD only
router.get("/getusers", authMiddleware, userController.getUsers);
router.post("/adduser", authMiddleware, validationMiddleware(UserDto), userController.addUser);
router.put("/updateuser/:id", authMiddleware, userController.updateUser);
router.delete("/deleteuser/:id", authMiddleware, userController.deleteUser);

//Auth
router.post("/register", validationMiddleware(UserDto), authController.registerNewUser);
router.post("/login", validationMiddleware(LogInDto), authController.logIn);
router.post("/logout", authController.logOut);

//Notes
router.get("/getnotes", authMiddleware, noteController.getUserNotes);
router.post("/addnote", authMiddleware, validationMiddleware(NoteDto), noteController.addUserNote);
router.put("/updatenote/:noteId", authMiddleware, validationMiddleware(NoteDto), noteController.updateUserNote);
router.delete("/deletenote/:noteId", authMiddleware, noteController.deleteUserNote);
export default router;
