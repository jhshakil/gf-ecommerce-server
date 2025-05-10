import jwt, { Secret } from "jsonwebtoken";
import { AuthUser } from "../app/modules/Auth/auth.interface";

export const generateToken = (
  payload: any,
  secret: Secret,
  expiresIn: string
) => {
  // @ts-ignore
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as AuthUser;
};
