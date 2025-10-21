import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DriverServices } from "./driver.service";

const acceptRide = catchAsync(async (req: Request, res: Response) => {
  const { rideId } = req.params;
  const { userId: driverId } = req.user as JwtPayload;
  const ride = await DriverServices.acceptRide(rideId, driverId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Ride Accepted Successfully",
    data: ride,
  });
});

const registerForDriver = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const payload = req.body;
  const newDriver = await DriverServices.registerForDriver(userId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Driver application submitted successfully.",
    data: newDriver,
  });
});

export const DriverController = {
  acceptRide,
  registerForDriver,
};
