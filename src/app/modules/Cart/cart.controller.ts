import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthUser } from "../Auth/auth.interface";
import sendResponse from "../../../utils/sendResponse";
import { CartServices } from "./cart.service";

const getCart = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;

    const cart = await CartServices.getOrCreateCart(userId as number);

    sendResponse(res, {
      message: "Cart get successfully",
      data: cart,
    });
  }
);

const addToCart = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;

    const cartItem = await CartServices.addToCart(
      userId as number,
      req.body.productId,
      req.body.quantity
    );

    sendResponse(res, {
      message: "Cart add successfully",
      data: cartItem,
    });
  }
);

const updateCartItem = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;
    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        message: "Invalid product ID",
        data: "",
      });
    }

    const cartItem = await CartServices.updateCartItem(
      userId as number,
      productId,
      req.body.quantity
    );

    sendResponse(res, {
      message: "Cart update successfully",
      data: cartItem,
    });
  }
);

const removeFromCart = catchAsync(
  async (req: Request & { user?: AuthUser }, res: Response) => {
    const userId = req.user?.id;
    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        message: "Invalid product ID",
        data: "",
      });
    }

    const cartItem = await CartServices.removeFromCart(
      userId as number,
      productId
    );

    sendResponse(res, {
      message: "Cart remove successfully",
      data: cartItem,
    });
  }
);

export const CartControllers = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
