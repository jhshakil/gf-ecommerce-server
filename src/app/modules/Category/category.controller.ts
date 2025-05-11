import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { CategoryServices } from "./category.service";
import sendResponse from "../../../utils/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await CategoryServices.createCategory(req.body);

  sendResponse(res, {
    message: "Category create successfully",
    data: category,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryServices.getCategories();

  sendResponse(res, {
    message: "Categories get successfully",
    data: categories,
  });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  if (isNaN(categoryId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid category ID",
      data: "",
    });
  }
  const category = await CategoryServices.getCategoryById(categoryId);

  if (!category) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: "Category not found",
      data: "",
    });
  }

  sendResponse(res, {
    message: "Category get successfully",
    data: category,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  if (isNaN(categoryId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid category ID",
      data: "",
    });
  }
  const category = await CategoryServices.updateCategory(categoryId, req.body);

  sendResponse(res, {
    message: "Category update successfully",
    data: category,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  if (isNaN(categoryId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Invalid category ID",
      data: "",
    });
  }
  const category = await CategoryServices.deleteCategory(categoryId);

  sendResponse(res, {
    message: "Category delete successfully",
    data: category,
  });
});

export const CategoryControllers = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
