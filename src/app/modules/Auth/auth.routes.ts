import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { auth } from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidations.register),
  AuthControllers.register
);
router.post(
  "/login",
  validateRequest(AuthValidations.login),
  AuthControllers.login
);

router.get(
  "/me",
  auth(Role.CUSTOMER, Role.ADMIN),
  AuthControllers.getCurrentUser
);

export const AuthRoutes = router;
