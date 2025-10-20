import httpStatus from "http-status-codes";
import { Ride } from "../ride/ride.model";
import AppError from "../../errorHelpers/AppError";
import { RideStatus } from "../ride/ride.interface";
import { Types } from "mongoose";

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

export const driverServices = {
  acceptRide,
};
