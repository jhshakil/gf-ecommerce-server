import { z } from "zod";

const order = z.object({
  body: z.object({
    status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
  }),
});

export const OrderValidations = {
  order,
};
