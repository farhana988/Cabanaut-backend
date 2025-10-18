import httpStatus from "http-status-codes";
import { IRide } from "./ride.interface";
import { Ride } from "./ride.model";
import { User } from "../user/user.model";
import { haversineDistanceInKm } from "../../utils/distance";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { Types } from "mongoose";

const BASE_FARE = parseFloat(envVars.BASE_FARE);
const PER_KM_RATE = parseFloat(envVars.PER_KM_RATE);

const createRide = async (payload: Partial<IRide>) => {
  const rider = await User.findOne({ _id: payload.rider });

  if (!rider) {
    throw new AppError(httpStatus.BAD_REQUEST, "rider not found");
  }

  if (
    !payload.pickupLocation ||
    !payload.destinationLocation ||
    typeof payload.pickupLocation.lat !== "number" ||
    typeof payload.pickupLocation.lng !== "number" ||
    typeof payload.destinationLocation.lat !== "number" ||
    typeof payload.destinationLocation.lng !== "number"
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid pickup or destination");
  }

  const distanceKm = haversineDistanceInKm(
    payload.pickupLocation.lat,
    payload.pickupLocation.lng,
    payload.destinationLocation.lat,
    payload.destinationLocation.lng
  );

  const fare = BASE_FARE + distanceKm * PER_KM_RATE;

  const newRide = await Ride.create({ ...payload, fare });

  return newRide;
};

const viewRideHistory = async (userId: string) => {
  const rideHistory = await Ride.find({ rider: new Types.ObjectId(userId) });

  if (!rideHistory) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride History Not Found");
  }

  return rideHistory;
};
export const RideServices = {
  createRide,
  viewRideHistory,
};
