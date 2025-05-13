import { prisma } from "../../../utils/prisma";
import { ProductFilter, ProductInput } from "./product.interface";

const createProduct = async (payload: ProductInput) => {
  return await prisma.product.create({
    data: payload,
    include: { category: true },
  });
};

const getProducts = async (filter: ProductFilter) => {
  const {
    category,
    minPrice,
    maxPrice,
    minRating,
    search,
    page = 1,
    limit = 12,
  } = filter;

  const where: any = {};

  if (category) {
    where.categoryId = category;
  }

  if (minPrice !== undefined) {
    where.price = { gte: minPrice };
  }

  if (maxPrice !== undefined) {
    where.price = { ...where.price, lte: maxPrice };
  }

  if (minRating !== undefined) {
    where.rating = { gte: minRating };
  }

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const skip = (page - 1) * limit;
  const take = limit;

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip,
      take,
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
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
