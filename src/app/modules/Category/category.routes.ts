import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validation";

const router = Router();

router.get("/", CategoryControllers.getCategories);
router.get("/:id", CategoryControllers.getCategory);
router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(CategoryValidations.createCategory),
  CategoryControllers.createCategory
);
router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(CategoryValidations.updateCategory),
  CategoryControllers.updateCategory
);
router.delete("/:id", auth(Role.ADMIN), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
