import { IAuthProvider, IUser, Role } from "./user.interface";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { User } from "./user.model";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { Driver } from "../driver/driver.model";
import { DriverApproveStatus } from "../driver/driver.interface";
import { Ride } from "../ride/ride.model";

// create user
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email: email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auth: [authProvider],
    ...rest,
  });

  return user;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

// update user
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
  }

  if (payload.role) {
    if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isBlocked || payload.isVerified) {
    if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

// get all users
const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

// get all riders
const getAllRider = async () => {
  const allRider = await Ride.find({}).sort({ createdAt: -1 });

  return allRider;
};

// get all drivers
const getAllDriver = async () => {
  const allDrivers = await Driver.find({}).sort({ createdAt: -1 });

  return allDrivers;
};

// block a user by userId
const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Blocked");
  }

  user.isBlocked = true;
  await user.save();
  return user;
};

// approve a driver's status by driverId
const driverApprovedStatus = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  const user = await User.findById(driver?.user);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver Not Found");
  }
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (driver.approvedStatus === DriverApproveStatus.Approved) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver Already Approved");
  }

  driver.approvedStatus = DriverApproveStatus.Approved;
  user.role = Role.DRIVER;

  await driver.save();
  await user.save();
  return driver;
};

// suspend a driver's status by driverId
const driverSuspendStatus = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  const user = await User.findById(driver?.user);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver Not Found");
  }
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (driver.approvedStatus === DriverApproveStatus.Suspended) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver Already Suspended");
  }

  driver.approvedStatus = DriverApproveStatus.Suspended;
  user.role = Role.RIDER;

  await driver.save();
  await user.save();
  return driver;
};

export const UserServices = {
  createUser,
  getMe,
  getAllUsers,
  getAllRider,
  getAllDriver,
  updateUser,
  blockUser,
  driverApprovedStatus,
  driverSuspendStatus,
};
