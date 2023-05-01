import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

// parse incoming requests data as JSON
app.use(cors());
app.use(express.json());

// define a route handler for the root path
app.post("/feedbacks", async (req, res) => {
  const { is_useful: isUseful, sessionID } = req.body;

  const feedback = await prisma.feedbacks.create({
    data: {
      sessionID,
      isUseful,
    },
  });

  res.json(feedback);
});

app.get("/feedbacks", async (_, res) => {
  const feedbacks = await prisma.feedbacks.findMany();
  res.json(feedbacks);
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
