import { Router } from "express";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

//  register a new user
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe);

// get all users
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserController.getAllUsers
);

// get all riders
router.get(
  "/all-riders",
  checkAuth(Role.SUPER_ADMIN),
  UserController.getAllRider
);

// get all drivers
router.get(
  "/all-drivers",
  checkAuth(Role.SUPER_ADMIN),
  UserController.getAllDriver
);

// update a user by ID
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);

// block a user by userId
router.patch(
  "/block-user/:userId",
  checkAuth(Role.SUPER_ADMIN),
  UserController.blockUser
);

// approve a driver's status by driverId
router.patch(
  "/approved-driver-status/:driverId",
  checkAuth(Role.SUPER_ADMIN),
  UserController.driverApprovedStatus
);

// suspend a driver's status by driverId
router.patch(
  "/suspended-driver-status/:driverId",
  checkAuth(Role.SUPER_ADMIN),
  UserController.driverSuspendStatus
);

export const userRoute = router;
