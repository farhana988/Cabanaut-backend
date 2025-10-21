import { Router } from "express";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserController.getAllUsers
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);
router.patch(
  "/block-user/:userId",
  checkAuth(Role.SUPER_ADMIN),
  UserController.blockUser
);
router.patch(
  "/approved-driver-status/:driverId",
  checkAuth(Role.SUPER_ADMIN),
  UserController.driverApprovedStatus
);

export const userRoute = router;
