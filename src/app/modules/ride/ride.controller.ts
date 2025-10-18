import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { RideServices } from "./ride.service";

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

export const RideController = {
  createRide,
};
