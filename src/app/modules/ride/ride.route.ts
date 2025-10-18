import { Router } from "express";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { RideController } from "./ride.controller";

const router = Router();

router.post("/book-ride", checkAuth(Role.RIDER), RideController.createRide);

router.get(
  "/ride-history",
  checkAuth(Role.RIDER),
  RideController.viewRideHistory
);

router.patch(
  "/cancel/:rideId",
  checkAuth(Role.RIDER),
  RideController.cancelRide
);

export const RideRoute = router;
