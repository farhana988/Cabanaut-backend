import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { requestForDriverZodSchema } from "./driver.validation";

const router = Router();

router.patch(
  "/accept/:rideId",
  checkAuth(Role.DRIVER),
  DriverController.acceptRide
);
router.post(
  "/register",
  checkAuth(Role.RIDER),
  validateRequest(requestForDriverZodSchema),
  DriverController.registerForDriver
);

export const DriverRoutes = router;
