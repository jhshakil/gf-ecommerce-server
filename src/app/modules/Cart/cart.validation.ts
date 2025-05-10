import { z } from "zod";

const createCart = z.object({
  body: z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  }),
});

const updateCart = z.object({
  body: z.object({
    quantity: z.number().int().positive(),
  }),
});

export const CartValidations = {
  createCart,
  updateCart,
};
