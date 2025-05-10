import { prisma } from "../../../utils/prisma";
import { ProductFilter, ProductInput } from "./product.interface";

const createProduct = async (payload: ProductInput) => {
  return await prisma.product.create({
    data: payload,
    include: { category: true },
  });
};

const getProducts = async (filter: ProductFilter) => {
  const where: any = {};

  if (filter.category) where.categoryId = filter.category;
  if (filter.minPrice !== undefined) where.price = { gte: filter.minPrice };
  if (filter.maxPrice !== undefined)
    where.price = { ...where.price, lte: filter.maxPrice };
  if (filter.minRating !== undefined) where.rating = { gte: filter.minRating };
  if (filter.search)
    where.name = { contains: filter.search, mode: "insensitive" };

  return await prisma.product.findMany({
    where,
    include: { category: true },
  });
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

const updateProduct = async (id: number, payload: Partial<ProductInput>) => {
  return await prisma.product.update({
    where: { id },
    data: payload,
    include: { category: true },
  });
};

const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const ProductServices = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
