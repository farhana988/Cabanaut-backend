import mongoose, { Types } from "mongoose";
import { DriverApproveStatus } from "../driver/driver.interface";
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}
export interface IAuthProvider {
  provider: "credentials" | "google";
  providerId: string;
}
export enum IsActive {
  Active = "ACTIVE",
  InActive = "IN-ACTIVE",
  Blocked = "BLOCKED",
}

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isBlocked?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;
  auth: IAuthProvider[];
  driverInfo?: {
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
  };
}
