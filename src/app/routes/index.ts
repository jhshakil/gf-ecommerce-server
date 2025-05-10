import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ProductRoutes } from "../modules/Product/product.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { CustomerRoutes } from "../modules/Customer/customer.routes";
import { CartRoutes } from "../modules/Cart/cart.routes";

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
  {
    path: "/customers",
    route: CustomerRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
