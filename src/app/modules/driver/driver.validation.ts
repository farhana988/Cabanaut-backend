import { Types } from "mongoose";
import z from "zod";
import { DriverApproveStatus } from "./driver.interface";

export const requestForDriverZodSchema = z.object({
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    })
    .optional(),

  vehicle: z
    .object({
      make: z.string().min(1, "Vehicle make is required").optional(),
      model: z.string().min(1, "Vehicle model is required").optional(),
      plateNumber: z
        .string()
        .min(1, "Vehicle plateNumber is required")
        .optional(),
    })
    .optional(),
  licenseNumber: z.string().min(1, "License number is required"),
  nationalId: z.string().min(1, "National ID is required"),
  vehicleImage: z.url().optional(),
  isOnline: z.boolean().optional(),
  approvedStatus: z
    .enum([
      DriverApproveStatus.Pending,
      DriverApproveStatus.Approved,
      DriverApproveStatus.Suspended,
    ])
    .optional(),
  totalEarning: z.number().nonnegative().optional(),
  currentRideId: z.string().nullable().optional(),
});
