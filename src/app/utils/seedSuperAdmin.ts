/* eslint-disable no-console */

import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import {
  IAuthProvider,
  IsActive,
  IUser,
  Role,
} from "../modules/user/user.interface";

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });
    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };
    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isActive: IsActive.Active,
      isBlocked: false,
      isVerified: true,
      role: Role.SUPER_ADMIN,
      auth: [authProvider],
    };
    const superAdmin = await User.create(payload);
    console.log("Super Admin Created Successfully \n");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};

export default seedSuperAdmin;
