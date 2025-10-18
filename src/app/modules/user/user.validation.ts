import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ error: "name must be string" })
    .min(2, { message: "Name is short minimum 2 character long" })
    .max(50, { message: "Name too long" }),

  email: z
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ error: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ error: "name must be string" })
    .min(2, { message: "Name is short minimum 2 character long" })
    .max(50, { message: "Name too long" })
    .optional(),

  password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .optional(),
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ error: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isBlocked: z.boolean({ error: "isBlocked must be true or false" }).optional(),
  isVerified: z
    .boolean({ error: "isVerified must be true or false" })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
});
