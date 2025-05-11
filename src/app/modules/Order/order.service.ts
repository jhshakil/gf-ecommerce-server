import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../utils/prisma";

const checkout = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItem: {
        include: {
          product: true,
        },
      },
      user: {
        include: {
          customer: true,
        },
      },
    },
  });

  if (!cart) throw new Error("Cart not found");
  if (!cart.user.customer) throw new Error("Customer information not complete");
  if (cart.cartItem.length === 0) throw new Error("Cart is empty");

  let total = 0;
  const orderItem = cart.cartItem.map((item) => {
    if (item.product.stock < item.quantity)
      throw new Error(`Insufficient stock for product ${item.product.name}`);

    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    };
  });

  return await prisma.$transaction(async (prisma) => {
    for (const item of cart.cartItem) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerId: cart.user.customer?.id as number,
        total,
        status: OrderStatus.PENDING,
        orderItem: {
          createMany: {
            data: orderItem,
          },
        },
      },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return newOrder;
  });
};

const getOrderHistory = async (userId: number) => {
  const customer = await prisma.customer.findUnique({
    where: { userId },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return await prisma.order.findMany({
    where: { customerId: customer.id },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const OrderServices = {
  checkout,
  getOrderHistory,
  updateOrderStatus,
};
