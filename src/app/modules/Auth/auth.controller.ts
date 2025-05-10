import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../utils/sendResponse";
import { AuthUser } from "./auth.interface";

const register = catchAsync(async (req: Request, res: Response) => {
  const { user, customer } = await AuthServices.register(req.body);

  sendResponse(res, {
    message: "Register successfully!",
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      customer,
    },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await AuthServices.login(req.body);

  sendResponse(res, {
    message: "Register successfully!",
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    },
  });
});

const getCurrentUser = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        data: "",
      });
    }

    const user = await AuthServices.getUserById(userId);

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User not found",
        data: "",
      });
    }

    sendResponse(res, {
      message: "User get successfully!",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        customer: user.customer,
      },
    });
  }
);

export const AuthControllers = {
  register,
  login,
  getCurrentUser,
};
