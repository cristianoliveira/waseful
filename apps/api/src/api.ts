import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
const prisma = new PrismaClient();

// parse incoming requests data as JSON
app.use(cors());
app.use(express.json());

// define a route handler for the root path
app.post("/feedbacks", async (req, res) => {
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
          .status(408)
          .json({ status: 409, message: "This session has already voted." });
      }
    }

    res.status(500).json({
      status: 500,
      message: `Something went wrong reason: ${err.message}`,
    });
  }
});

app.get("/feedbacks", async (_, res) => {
  const feedbacks = await prisma.feedbacks.findMany();
  res.json(feedbacks);
});

export default app;
