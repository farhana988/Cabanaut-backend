import httpStatus from "http-status-codes";
import { Ride } from "../ride/ride.model";
import AppError from "../../errorHelpers/AppError";
import { RideStatus } from "../ride/ride.interface";
import { Types } from "mongoose";
import { Driver } from "./driver.model";
import { IDriver } from "./driver.interface";
import { User } from "../user/user.model";
import { Role } from "../user/user.interface";

const acceptRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Could not find the ride.");
  }
  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This ride is no longer available for acceptance."
    );
  }
  if (ride.driver) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This ride has already been assigned to another driver."
    );
  }

  ride.driver = new Types.ObjectId(driverId);
  ride.status = RideStatus.ACCEPTED;
  ride.timestampsLog.acceptedAt = new Date();
  await ride.save();

  return ride;
};

const registerForDriver = async (userId: string, payload: Partial<IDriver>) => {
  const existingDrive = await Driver.findOne({ user: userId });
  if (existingDrive) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User has already applied or is already registered as a driver."
    );
  }

  const newDriver = await Driver.create({
    user: userId,
    ...payload,
  });
  const user = await User.findById(userId);
  if (user) {
    user.role = Role.DRIVER;
    await user.save();
  }
  return newDriver;
};

export const DriverServices = {
  acceptRide,
  registerForDriver,
};
