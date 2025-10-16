import { Router } from "express";
import { userRoute } from "../modules/user/user.route";

export const router = Router();

const moduleRouts = [
  {
    path: "/user",
    route: userRoute,
  },
];

moduleRouts.forEach((route) => {
  router.use(route.path, route.route);
});
