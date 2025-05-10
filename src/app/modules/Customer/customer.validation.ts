import { z } from "zod";

const customer = z.object({
  body: z.object({
    phone: z.string().optional(),
    image: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }),
});

export const CustomerValidations = {
  customer,
};
