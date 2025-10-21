import mongoose, { Types } from "mongoose";

export enum DriverApproveStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Suspended = "SUSPENDED",
}

export enum DriverAvailability {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  OFFLINE = "OFFLINE",
  ON_RIDE = "ON_RIDE",
  BUSY = "BUSY",
}

export interface IDriver {
  _id?: mongoose.Types.ObjectId;
  user: Types.ObjectId;
  vehicle: {
    make?: string;
    model?: string;
    plateNumber?: string;
  };
  licenseNumber: string;
  nationalId: string;
  vehicleImage?: string;
  isOnline?: boolean;
  availabilityStatus?: DriverApproveStatus;
  totalEarning?: number;
  currentRide?: Types.ObjectId | null;
}
