import { z } from "zod";

const createProduct = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string(),
    price: z.number().positive(),
    image: z.string(),
    stock: z.number().int().nonnegative(),
    categoryId: z.number().int().positive(),
  }),
});

const updateProduct = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    image: z.string().optional(),
    stock: z.number().int().nonnegative().optional(),
    categoryId: z.number().int().positive().optional(),
  }),
});

export const ProductValidations = {
  createProduct,
  updateProduct,
};
