import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { driverController } from "./driver.controller";

const router = Router();

router.patch(
  "/accept/:rideId",
  checkAuth(Role.DRIVER),
  driverController.acceptRide
);
