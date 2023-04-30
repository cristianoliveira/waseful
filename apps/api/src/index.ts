import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

// parse incoming requests data as JSON
app.use(express.json());

// define a route handler for the root path
app.post("/feedbacks", async (req, res) => {
  const { is_useful: isUseful, reason, content } = req.body;

  const feedback = await prisma.feedbacks.create({
    data: {
      content,
      reason,
      isUseful,
    },
  });

  res.json(feedback);
});

app.get("/feedbacks", async (_, res) => {
  const feedbacks = await prisma.feedbacks.findMany();
  res.json(feedbacks);
});

// start the server on port 3000
app.listen(port, () => {
  console.log(`PORT ${port}`);
});
