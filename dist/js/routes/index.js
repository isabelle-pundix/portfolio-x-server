"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const note_controller_1 = require("../controller/note.controller");
const user_controller_1 = require("../controller/user.controller");
const cmcData_controller_1 = require("../controller/cmcData.controller");
const fxcored_controller_1 = require("../controller/fxcored.controller");
const logIn_dto_1 = require("../dto/logIn.dto");
const note_dto_1 = require("../dto/note.dto");
const user_dto_1 = require("../dto/user.dto");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const userController = new user_controller_1.UserController();
const authController = new auth_controller_1.AuthController();
const noteController = new note_controller_1.NoteController();
const cmcDataController = new cmcData_controller_1.CmcDataController();
const fxcoredController = new fxcored_controller_1.FxcoredController();
const router = (0, express_1.Router)();
//Test CRUD only
router.get("/getusers", auth_middleware_1.authMiddleware, userController.getUsers);
router.post("/adduser", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(user_dto_1.UserDto), userController.addUser);
router.put("/updateuser/:id", auth_middleware_1.authMiddleware, userController.updateUser);
router.delete("/deleteuser/:id", auth_middleware_1.authMiddleware, userController.deleteUser);
//fetch user details
router.get("/user", auth_middleware_1.authMiddleware, userController.getUser);
//Auth
router.post("/register", (0, validation_middleware_1.validationMiddleware)(user_dto_1.UserDto), authController.registerNewUser);
router.post("/login", (0, validation_middleware_1.validationMiddleware)(logIn_dto_1.LogInDto), authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authController.logout);
//Notes
router.get("/getnotes", auth_middleware_1.authMiddleware, noteController.getUserNotes);
router.post("/addnote", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(note_dto_1.NoteDto), noteController.addUserNote);
router.put("/updatenote/:noteId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(note_dto_1.NoteDto), noteController.updateUserNote);
router.delete("/deletenote/:noteId", auth_middleware_1.authMiddleware, noteController.deleteUserNote);
//CMC
router.get("/getCmcMeta", auth_middleware_1.authMiddleware, cmcDataController.getMetaData);
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
exports.default = router;
