import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { RideServices } from "./ride.service";
import { JwtPayload } from "jsonwebtoken";

const createRide = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const ride = await RideServices.createRide(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "ride Created Successfully",
    data: ride,
  });
});

const viewRideHistory = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const rideHistory = await RideServices.viewRideHistory(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "All View Ride History Retrieved Successfully",
    data: rideHistory,
  });
});

export const RideController = {
  createRide,
  viewRideHistory,
};
