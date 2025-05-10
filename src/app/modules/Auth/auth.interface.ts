import { z } from "zod";
import { AuthValidations } from "./auth.validation";

export type RegisterInput = z.infer<typeof AuthValidations.register>;
export type LoginInput = z.infer<typeof AuthValidations.login>;
export type AuthUser = {
  id: number;
  email: string;
  role: string;
};
