import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { NoteController } from "../controller/note.controller";
import { UserController } from "../controller/user.controller";
import { LogInDto } from "../dto/logIn.dto";
import { UserDto } from "../dto/user.dto";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";

const userController = new UserController();
const authController = new AuthController();
const noteController = new NoteController();
const router: Router = Router();

router.get("/getusers", userController.getUsers);
router.post("/adduser", userController.addUser);
router.put("/updateuser/:id", userController.updateUser);
router.delete("/deleteuser/:id", userController.deleteUser);

router.post("/registeruser", validationMiddleware(UserDto), authController.registerNewUser);
router.post("/login", validationMiddleware(LogInDto), authController.logIn);
router.post("/logout", authController.logOut);

router.get("/getnotes", authMiddleware, noteController.getUserNotes);
router.post("/addnote", authMiddleware, noteController.addUserNote);
export default router;
