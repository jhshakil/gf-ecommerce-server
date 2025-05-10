import { Router } from "express";
import { ProductControllers } from "./product.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidations } from "./product.validation";

const router = Router();

router.get("/", ProductControllers.getProducts);
router.get("/:id", ProductControllers.getProduct);
router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(ProductValidations.createProduct),
  ProductControllers.createProduct
);
router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(ProductValidations.updateProduct),
  ProductControllers.updateProduct
);
router.delete("/:id", auth(Role.ADMIN), ProductControllers.deleteProduct);

export const ProductRoutes = router;
