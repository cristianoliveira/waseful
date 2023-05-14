import { RequestHandler } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const endpoint = "/feedbacks";

export const post: RequestHandler = async (req, res) => {
  const { is_useful: isUseful, sessionID } = req.body;

  try {
    const feedback = await prisma.feedbacks.create({
      data: {
        sessionID,
        isUseful,
      },
    });

    res.json(feedback);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res
          .status(409)
          .json({ status: 409, message: "This session has already voted." });
      }
    }

    res.status(500).json({
      status: 500,
      message: `Something went wrong reason: ${err.message}`,
    });
  }
};

export const get: RequestHandler = async (_, res) => {
  const feedbacks = await prisma.feedbacks.findMany();
  res.json(feedbacks);
};
