import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { verifyToken } from "../../utils/tokenHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { AuthUser } from "../modules/Auth/auth.interface";

export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: AuthUser },
    res: Response,
    next: NextFunction
  ) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Authentication required",
        data: "",
      });
    }

    try {
      const decoded = verifyToken(token, config.jwt_secret as Secret);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role))
        return sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          message: "Unauthorized access",
          data: "",
        });

      next();
    } catch (error) {
      sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid token",
        data: "",
      });
    }
  };
};
