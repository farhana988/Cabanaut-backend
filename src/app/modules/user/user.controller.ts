/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// create user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const result = await UserServices.getMe(decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Your profile Retrieved Successfully",
      data: result,
    });
  }
);

// update user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

// get all users
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// get all riders
const getAllRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllRider();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rider Retrieved successfully",
      data: users,
    });
  }
);

// get all drivers
const getAllDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await UserServices.getAllDriver();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Driver Retrieved successfully",
      data: driver,
    });
  }
);

// block a user by userId
const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const driver = await UserServices.blockUser(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Blocked successfully",
      data: driver,
    });
  }
);

// approve a driver's status by driverId
const driverApprovedStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { driverId } = req.params;
    const driver = await UserServices.driverApprovedStatus(driverId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver Status Approved successfully",
      data: driver,
    });
  }
);

// suspend a driver's status by driverId
const driverSuspendStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { driverId } = req.params;
    const driver = await UserServices.driverSuspendStatus(driverId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver has been suspended successfully",
      data: driver,
    });
  }
);

export const UserController = {
  createUser,
  getMe,
  getAllUsers,
  getAllRider,
  getAllDriver,
  updateUser,
  blockUser,
  driverApprovedStatus,
  driverSuspendStatus,
};
