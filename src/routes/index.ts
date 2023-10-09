import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { NoteController } from "../controller/note.controller";
import { UserController } from "../controller/user.controller";
import { CmcDataController } from "../controller/cmcData.controller";
import { FxcoredController } from "../controller/fxcored.controller";
import { LogInDto } from "../dto/logIn.dto";
import { NoteDto } from "../dto/note.dto";
import { UserDto } from "../dto/user.dto";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";

const userController = new UserController();
const authController = new AuthController();
const noteController = new NoteController();
const cmcDataController = new CmcDataController();
const fxcoredController = new FxcoredController();

const router: Router = Router();

//Test CRUD only
router.get("/getusers", authMiddleware, userController.getUsers); //OK (authmiddleware)
router.post("/adduser", authMiddleware, validationMiddleware(UserDto), userController.addUser); //OK (authmiddleware)
router.put("/updateuser/:id", authMiddleware, userController.updateUser); 
router.delete("/deleteuser/:id", authMiddleware, userController.deleteUser);

//User
router.get("/user", authMiddleware, userController.getUserById)
router.get("userByWalletAddress", authMiddleware, userController.getUserByWalletAddress);
router.put("/user/:id", authMiddleware, userController.updateUser); //OK (authmiddleware)

//Auth
// router.post("/register", validationMiddleware(UserDto), authController.registerNewUser);
// router.post("/login", validationMiddleware(LogInDto), authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/walletlogin", authController.walletLogin)

//Notes
router.get("/note", authMiddleware, noteController.getUserNotes);
router.post("/note", authMiddleware, validationMiddleware(NoteDto), noteController.addUserNote);
router.post("/note/:noteId", authMiddleware, validationMiddleware(NoteDto), noteController.updateUserNote);
router.delete("/note/:noteId", authMiddleware, noteController.deleteUserNote);

//CMC
router.get("/getCmcMeta", authMiddleware, cmcDataController.getMetaData);
router.get("/getLatest", cmcDataController.getLatestData);

//Fxcored
router.get("/totalRewards", fxcoredController.getDelegatorTotalRewards);
router.get("/validatorsLite", fxcoredController.getValidatorsLite);
router.get("/delegatorDelegations", fxcoredController.getDelegatorDelegations);
router.get("/validatorsFull", fxcoredController.getValidatorsFull);
router.get("/validatorCommission", fxcoredController.getValidatorCommission);
router.get("/validatorOutstandingRewards", fxcoredController.getValidatorOutstandingRewards);
router.get("/events0", fxcoredController.getEventsNode);
router.get("/events1", fxcoredController.getEventsRest);
router.get("/withdrawals0", fxcoredController.getWithdrawalsNode);
router.get("/withdrawals1", fxcoredController.getWithdrawalsRest);
router.get("/poolInfo", fxcoredController.getPoolInfo);

// router.get("/test", authController.test);

export default router;
