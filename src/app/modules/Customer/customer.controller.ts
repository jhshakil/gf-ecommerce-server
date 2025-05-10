import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthUser } from "../Auth/auth.interface";
import sendResponse from "../../../utils/sendResponse";
import { CustomerServices } from "./customer.service";

const updateCustomer = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;

    const customer = await CustomerServices.updateCustomer(
      userId as number,
      req.body
    );

    sendResponse(res, {
      message: "Customer update successfully",
      data: customer,
    });
  }
);

const getCustomer = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;

    const customer = await CustomerServices.getCustomer(userId as number);

    sendResponse(res, {
      message: "Customer get successfully",
      data: customer,
    });
  }
);

export const CustomerControllers = {
  updateCustomer,
  getCustomer,
};
