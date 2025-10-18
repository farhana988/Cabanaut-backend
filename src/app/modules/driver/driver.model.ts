import { model, Schema } from "mongoose";
import { DriverApproveStatus, IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    vehicle: {
      make: { type: String },
      model: { type: String },
      plateNumber: { type: String },
    },
    licenseNumber: { type: String, required: true },
    nationalId: { type: String, required: true },
    vehicleImage: { type: String },
    isOnline: { type: Boolean, default: false },
    approvedStatus: {
      type: String,
      enum: Object.values(DriverApproveStatus),
      default: DriverApproveStatus.Pending,
    },
    totalEarning: { type: Number, default: 0 },
    currentRide: {
      type: Schema.Types.ObjectId,
      ref: "Ride",
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Driver = model<IDriver>("Driver", driverSchema);
