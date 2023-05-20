import { RequestHandler } from "express";

import { rawQuery } from "../models";

export const endpoint = "/health-check";

export const get: RequestHandler = async (_, res) => {
  try {
    await rawQuery`SELECT 1+1;`;

    res.status(200).send({
      status: "ok",
    });
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: e.message,
    });
  }
};
