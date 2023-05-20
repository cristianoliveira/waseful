import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ModelErrors extends Error {
  code: string;
}

export const feedbacks = () => prisma.feedbacks;
export const feedbackDetails = () => prisma.feedback_details;

export const rawQuery = async (query: TemplateStringsArray) =>
  await prisma.$queryRaw<Prisma.PromiseReturnType<typeof prisma.$executeRaw>>(
    query
  );

export const CODE_ERRORS = {
  DUPLICATED: "P2002",
} as const;

export default prisma;
