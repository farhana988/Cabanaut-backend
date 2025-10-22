import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { requestForDriverZodSchema } from "./driver.validation";

const router = Router();

router.post(
  "/register",
  checkAuth(Role.RIDER),
  validateRequest(requestForDriverZodSchema),
  DriverController.registerForDriver
);

router.patch(
  "/is-online",
  checkAuth(Role.DRIVER),
  DriverController.onlineStatus
);

router.patch(
  "/accept/:rideId",
  checkAuth(Role.DRIVER),
  DriverController.acceptRide
);

router.patch(
  "/reject/:rideId",
  checkAuth(Role.DRIVER),
  DriverController.rejectRide
);

router.patch(
  "/update-status/:rideId",
  checkAuth(Role.DRIVER),
  DriverController.updateRideStatus
);

router.get(
  "/earnings",
  checkAuth(Role.DRIVER),
  DriverController.viewEarningsHistory
);
export const DriverRoutes = router;
