import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../../utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductServices.createProduct(req.body);

  sendResponse(res, {
    message: "Product create successfully",
    data: product,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filter = {
    category: req.query.category ? Number(req.query.category) : undefined,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
    search: req.query.search ? String(req.query.search) : undefined,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 12,
  };

  const product = await ProductServices.getProducts(filter);

  sendResponse(res, {
    message: "Products get successfully",
    data: product,
  });
});

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid product ID",
      data: "",
    });
  }

  const product = await ProductServices.getProductById(productId);

  if (!product) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: "Product not found",
      data: "",
    });
  }

  sendResponse(res, {
    message: "Product get successfully",
    data: product,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid product ID",
      data: "",
    });
  }

  const product = await ProductServices.updateProduct(productId, req.body);

  sendResponse(res, {
    message: "Product update successfully",
    data: product,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid product ID",
      data: "",
    });
  }

  const product = await ProductServices.deleteProduct(productId);

  sendResponse(res, {
    message: "Product delete successfully",
    data: product,
  });
});

export const ProductControllers = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
