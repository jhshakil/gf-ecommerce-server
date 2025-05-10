import { prisma } from "../../../utils/prisma";
import { CustomerInput } from "./customer.interface";

const updateCustomer = async (
  userId: number,
  payload: Partial<CustomerInput>
) => {
  return await prisma.customer.update({
    where: { userId },
    data: payload,
  });
};

const getCustomer = async (userId: number) => {
  return await prisma.customer.findUnique({
    where: { userId },
  });
};

export const CustomerServices = {
  updateCustomer,
  getCustomer,
};
