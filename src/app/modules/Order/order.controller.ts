import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthUser } from "../Auth/auth.interface";
import { OrderServices } from "./order.service";
import sendResponse from "../../../utils/sendResponse";

const checkout = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;

    const order = await OrderServices.checkout(userId as number);

    sendResponse(res, {
      message: "Order place successfully",
      data: order,
    });
  }
);

const getOrderByHistory = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;

    const orders = await OrderServices.getOrderHistory(userId as number);

    sendResponse(res, {
      message: "Order history get successfully",
      data: orders,
    });
  }
);

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);

  if (isNaN(orderId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid order ID",
      data: "",
    });
  }

  const order = await OrderServices.updateOrderStatus(orderId, req.body.status);

  sendResponse(res, {
    message: "Update order status",
    data: order,
  });
});

export const OrderControllers = {
  checkout,
  getOrderByHistory,
  updateOrderStatus,
};
