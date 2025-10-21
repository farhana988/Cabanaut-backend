import mongoose, { Types } from "mongoose";

export enum DriverApproveStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Suspended = "SUSPENDED",
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
  approvedStatus?: DriverApproveStatus;
  totalEarning?: number;
  currentRide?: Types.ObjectId | null;
}
