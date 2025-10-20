import httpStatus from "http-status-codes";

import { Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { driverServices } from "./driver.service";

const acceptRide = catchAsync(async (req: Request, res: Response) => {
  const { rideId } = req.params;
  const { userId: driverId } = req.user as JwtPayload;
  const ride = await driverServices.acceptRide(rideId, driverId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Ride Accepted Successfully",
    data: ride,
  });
});
export const driverController = {
  acceptRide,
};
