import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { NoteController } from "../controller/note.controller";
import { UserController } from "../controller/user.controller";
import { CmcDataController } from "../controller/cmcData.controller";
import { LogInDto } from "../dto/logIn.dto";
import { NoteDto } from "../dto/note.dto";
import { UserDto } from "../dto/user.dto";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";

const userController = new UserController();
const authController = new AuthController();
const noteController = new NoteController();
const cmcDataController = new CmcDataController();
const router: Router = Router();

//Test CRUD only
router.get("/getusers", authMiddleware, userController.getUsers);
router.post("/adduser", authMiddleware, validationMiddleware(UserDto), userController.addUser);
router.put("/updateuser/:id", authMiddleware, userController.updateUser);
router.delete("/deleteuser/:id", authMiddleware, userController.deleteUser);

//User
router.get("/user", authMiddleware, userController.getUser)
router.put("/user/:id", authMiddleware, userController.updateUser);

//Auth
router.post("/register", validationMiddleware(UserDto), authController.registerNewUser);
router.post("/login", validationMiddleware(LogInDto), authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authController.logout);

//Notes
router.get("/note", authMiddleware, noteController.getUserNotes);
router.post("/note", authMiddleware, validationMiddleware(NoteDto), noteController.addUserNote);
router.put("/note/:noteId", authMiddleware, validationMiddleware(NoteDto), noteController.updateUserNote);
router.delete("/note/:noteId", authMiddleware, noteController.deleteUserNote);

//CMC
router.get("/getCmcMeta", authMiddleware, cmcDataController.getMetaData);
router.get("/getLatest", cmcDataController.getLatestData);
export default router;
