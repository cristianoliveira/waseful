import { RequestHandler } from "express";

import { feedbacks, CODE_ERRORS } from "../models";

export const endpoint = "/feedbacks";

export const post: RequestHandler = async (req, res) => {
  const { is_useful: isUseful, sessionID } = req.body;

  if (!sessionID || typeof isUseful === "undefined") {
    return res.status(400).json({
      status: 400,
      message: "Missing required fields.",
    });
  }

  try {
    const feedback = await feedbacks().create({
      data: {
        sessionID,
        isUseful,
      },
    });

    res.json(feedback);
  } catch (err) {
    if (err.code === CODE_ERRORS.DUPLICATED) {
      return res
        .status(409)
        .json({ status: 409, message: "This session has already voted." });
    }

    res.status(500).json({
      status: 500,
      message: `Something went wrong reason: ${err.message}`,
    });
  }
};

export const get: RequestHandler = async (_, res) => {
  const feedbackRes = await feedbacks().findMany();
  res.json(feedbackRes);
};
