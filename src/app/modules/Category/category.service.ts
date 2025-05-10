import { prisma } from "../../../utils/prisma";
import { CategoryInput } from "./category.interface";

const createCategory = async (payload: CategoryInput) => {
  return await prisma.category.create({
    data: payload,
  });
};

const getCategories = async () => {
  return await prisma.category.findMany();
};

const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({
    where: { id },
    include: { product: true },
  });
};

const updateCategory = async (id: number, payload: Partial<CategoryInput>) => {
  return await prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryServices = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
