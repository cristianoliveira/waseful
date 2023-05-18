import { RequestHandler } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const endpoint = "/health-check";

export const get: RequestHandler = async (_, res) => {
  await prisma.$queryRaw<
    Prisma.PromiseReturnType<typeof prisma.$executeRaw>
  >`SELECT 1+1;`;

  res.status(200).send({
    status: "ok",
  });
};
