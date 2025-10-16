import { Router } from "express";

import { createUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);

export const userRoute = router;
