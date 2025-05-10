import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ProductRoutes } from "../modules/Product/product.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
