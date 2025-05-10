import { Router } from "express";
import { CartControllers } from "./cart.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { CartValidations } from "./cart.validation";

const router = Router();

router.get("/", auth(Role.CUSTOMER), CartControllers.getCart);
router.post(
  "/",
  auth(Role.CUSTOMER),
  validateRequest(CartValidations.createCart),
  CartControllers.addToCart
);
router.patch(
  "/:productId",
  auth(Role.CUSTOMER),
  validateRequest(CartValidations.updateCart),
  CartControllers.updateCartItem
);
router.delete(
  "/:productId",
  auth(Role.CUSTOMER),
  CartControllers.removeFromCart
);

export const CartRoutes = router;
