"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const note_controller_1 = require("../controller/note.controller");
const user_controller_1 = require("../controller/user.controller");
const cmcData_controller_1 = require("../controller/cmcData.controller");
const fxcored_controller_1 = require("../controller/fxcored.controller");
const note_dto_1 = require("../dto/note.dto");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const walletAddress_controller_1 = require("../controller/walletAddress.controller");
const walletAddressAdd_dto_1 = require("../dto/walletAddressAdd.dto");
const walletAddressUpdate_dto_1 = require("../dto/walletAddressUpdate.dto");
const userController = new user_controller_1.UserController();
const authController = new auth_controller_1.AuthController();
const noteController = new note_controller_1.NoteController();
const cmcDataController = new cmcData_controller_1.CmcDataController();
const fxcoredController = new fxcored_controller_1.FxcoredController();
const walletAddressController = new walletAddress_controller_1.WalletAddressController();
const router = (0, express_1.Router)();
//Test CRUD only
router.get("/getusers", auth_middleware_1.authMiddleware, userController.getUsers);
// router.post("/adduser", authMiddleware, validationMiddleware(UserDto), userController.addUser); 
// router.put("/updateuser/:id", authMiddleware, userController.updateUser); 
// router.delete("/deleteuser/:id", authMiddleware, userController.deleteUser);
//User
router.get("/user", auth_middleware_1.authMiddleware, userController.getUserById); // Read user 
// router.post("/adduser", authMiddleware, validationMiddleware(UserDto), userController.addUser); // Add user
// router.get("userByWalletAddress", authMiddleware, userController.getUserByWalletAddress);
// router.put("/user/:id", authMiddleware, userController.updateUser); 
//Auth
// router.post("/register", validationMiddleware(UserDto), authController.registerNewUser);
// router.post("/login", validationMiddleware(LogInDto), authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/walletlogin", authController.walletLogin);
//Notes
router.get("/note", auth_middleware_1.authMiddleware, noteController.getUserNotes);
router.post("/note", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(note_dto_1.NoteDto), noteController.addUserNote);
router.post("/note/:noteId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(note_dto_1.NoteDto), noteController.updateUserNote);
router.delete("/note/:noteId", auth_middleware_1.authMiddleware, noteController.deleteUserNote);
// Wallet Addresses
router.get("/walletAddress", auth_middleware_1.authMiddleware, walletAddressController.getUserWalletAddresseses); //get all wallet addresses for user 
router.post("/walletAddress", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(walletAddressAdd_dto_1.WalletAddressAddDto), walletAddressController.addUserWalletAddress); // add wallet address 
router.post("/walletAddress/:walletAddressId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(walletAddressUpdate_dto_1.WalletAddressUpdateDto), walletAddressController.updateUserWalletAddress); // update wallet address
router.delete("/walletAddress/:walletAddressId", auth_middleware_1.authMiddleware, walletAddressController.deleteUserWalletAddress); // delete wallet address 
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
// router.get("/test", authController.test);
exports.default = router;
