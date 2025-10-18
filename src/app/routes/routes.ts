import { RideRoute } from "./../modules/ride/ride.route";
import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRouts = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/ride",
    route: RideRoute,
  },
];

moduleRouts.forEach((route) => {
  router.use(route.path, route.route);
});
