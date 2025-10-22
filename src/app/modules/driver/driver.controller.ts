import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DriverServices } from "./driver.service";

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

const onlineStatus = catchAsync(async (req: Request, res: Response) => {
  const { isOnline } = req.body;
  const { userId: driverUserId } = req.user as JwtPayload;
  const driver = await DriverServices.onlineStatus(driverUserId, isOnline);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Driver is now ${isOnline ? "online" : "offline"}.`,
    data: driver,
  });
});

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

const rejectRide = catchAsync(async (req: Request, res: Response) => {
  const { rideId } = req.params;
  const ride = await DriverServices.rejectRide(rideId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride Rejected Successfully",
    data: ride,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const { rideId } = req.params;
  const { status } = req.body;
  const { userId: driverUserId } = req.user as JwtPayload;
  const ride = await DriverServices.updateRideStatus(
    rideId,
    driverUserId,
    status
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Ride Status Updated Successfully",
    data: ride,
  });
});

const viewEarningsHistory = catchAsync(async (req: Request, res: Response) => {
  const { userId: driverUserId } = req.user as JwtPayload;
  const earnings = await DriverServices.viewEarningsHistory(driverUserId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Earnings history retrieved Successfully",
    data: earnings,
  });
});

export const DriverController = {
  registerForDriver,
  onlineStatus,
  acceptRide,
  rejectRide,
  updateRideStatus,
  viewEarningsHistory,
};
