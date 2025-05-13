import config from "../../../config";
import { prisma } from "../../../utils/prisma";
import { generateToken } from "../../../utils/tokenHelper";
import { LoginInput, RegisterInput } from "./auth.interface";
import bcrypt from "bcryptjs";
import { Secret } from "jsonwebtoken";

const register = async (payload: RegisterInput) => {
  const { email, password, name } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.$transaction(async () => {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CUSTOMER",
      },
    });

    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
      },
    });

    await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    const token = generateToken(
      { id: user.id, email: user.email, role: user.role },
      config.jwt_secret as Secret,
      config.expires_in as string
    );

    return { user, customer, token };
  });
};

const login = async (payload: LoginInput) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Invalid credentials");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_secret as Secret,
    config.expires_in as string
  );

  return {
    user,
    token,
  };
};

const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { customer: true },
  });
};

export const AuthServices = {
  register,
  login,
  getUserById,
};
