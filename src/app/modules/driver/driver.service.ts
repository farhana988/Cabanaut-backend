import httpStatus from "http-status-codes";
import { Ride } from "../ride/ride.model";
import AppError from "../../errorHelpers/AppError";
import { RideStatus } from "../ride/ride.interface";
import { Types } from "mongoose";
import { Driver } from "./driver.model";
import { DriverApproveStatus, IDriver } from "./driver.interface";

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

  return newDriver;
};

const onlineStatus = async (driverUserId: string, isOnline: boolean) => {
  const driver = await Driver.findOne({
    user: new Types.ObjectId(driverUserId),
  });
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver Not Found");
  }

  if (driver.approvedStatus !== DriverApproveStatus.Approved) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver Is Not Approved");
  }

  driver.isOnline = isOnline;
  await driver.save();
  return driver;
};

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

const rejectRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "ride not found");
  }

  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rides can only be rejected while in requested status"
    );
  }
  ride.status = RideStatus.REJECTED;
  await ride.save();

  return ride;
};

export const DriverServices = {
  registerForDriver,
  onlineStatus,
  acceptRide,
  rejectRide,
};
