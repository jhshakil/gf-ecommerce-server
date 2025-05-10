import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    name: z.string().min(3),
    slug: z.string().min(3),
    image: z.string().optional(),
  }),
});

const updateCategory = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    image: z.string().optional(),
  }),
});

export const CategoryValidations = {
  createCategory,
  updateCategory,
};
