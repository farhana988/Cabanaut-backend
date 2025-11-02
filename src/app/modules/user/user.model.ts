import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
import { DriverApproveStatus } from "../driver/driver.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const driverInfoSchema = new Schema(
  {
    vehicle: {
      make: { type: String },
      model: { type: String },
      plateNumber: { type: String },
    },
    licenseNumber: { type: String },
    nationalId: { type: String },
    vehicleImage: { type: String },
    isOnline: { type: Boolean, default: false },
    approvedStatus: {
      type: String,
      enum: Object.values(DriverApproveStatus),
      default: DriverApproveStatus.Pending,
    },
    totalEarning: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER,
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },

    isBlocked: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.Active,
    },
    isVerified: { type: Boolean, default: false },
    auth: [authProviderSchema],
    driverInfo: driverInfoSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
