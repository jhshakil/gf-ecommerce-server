import { z } from "zod";

const register = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const AuthValidations = {
  register,
  login,
};
