import { RequestHandler } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const endpoint = "/reasons";

export const post: RequestHandler = async (req, res) => {
  const { sessionID, reason, moreInfo } = req.body;

  try {
    const feedbackInfo = await prisma.feedback_details.create({
      data: {
        sessionID,
        reason,
        moreInfo,
      },
    });

    res.json(feedbackInfo);
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
