import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "./customer.validation";
import { CustomerControllers } from "./customer.controller";

const router = Router();

router.patch(
  "/:id",
  auth(Role.CUSTOMER),
  validateRequest(CustomerValidations.customer),
  CustomerControllers.updateCustomer
);
router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN),
  CustomerControllers.getCustomer
);

export const CustomerRoutes = router;
