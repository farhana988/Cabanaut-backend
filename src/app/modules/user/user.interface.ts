import mongoose, { Types } from "mongoose";
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
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: IsActive;
  role: Role;
  auth: IAuthProvider[];
  bookings?: Types.ObjectId[];
}
