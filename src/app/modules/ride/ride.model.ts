import { model, Schema } from "mongoose";
import { IRide, RideCancelledBy, RideStatus } from "./ride.interface";

const locationSchema = new Schema(
  {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
    address: { type: String },
  },
  { _id: false }
);

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "Driver", default: null },
    pickupLocation: locationSchema,
    destinationLocation: locationSchema,
    fare: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
    },
    timestampsLog: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: Date,
      pickedUpAt: Date,
      inTransitAt: Date,
      completedAt: Date,
      cancelledAt: Date,
    },
    cancelledBy: {
      type: String,
      enum: Object.values(RideCancelledBy),
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Ride = model<IRide>("Ride", rideSchema);
