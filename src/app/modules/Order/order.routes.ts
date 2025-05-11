import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { OrderControllers } from "./order.controller";

const router = Router();

router.post("/checkout", auth(Role.CUSTOMER), OrderControllers.checkout);
router.get(
  "/orders/history",
  auth(Role.CUSTOMER),
  OrderControllers.getOrderByHistory
);
router.patch(
  "/orders/:id/status",
  auth(Role.ADMIN),
  OrderControllers.updateOrderStatus
);

export const OrderRoutes = router;
