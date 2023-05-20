import { describe, it, vi } from "vitest";
import request from "supertest";
import * as models from "./models";

import api from "./api";

describe("api", () => {
  describe("health-check", () => {
    it("returns 200 and status ok when healthy", async () => {
      await request(api)
        .get("/health-check")
        .expect(200)
        .expect({ status: "ok" });
    });

    it("returns 500 and when not healthy", async () => {
      vi.spyOn(models, "rawQuery").mockRejectedValueOnce(new Error("error"));

      await request(api).get("/health-check").expect(500);
    });
  });

  describe("feedbacks", () => {
    it("returns 400 when missing required fields", async () => {
      await request(api).post("/feedbacks").expect(400);
    });

    it("returns 409 when session has already voted", async () => {
      vi.spyOn(models, "feedbacks").mockImplementationOnce(() => {
        const httpError = new Error("error");
        (httpError as models.ModelErrors).code = models.CODE_ERRORS.DUPLICATED;
        throw httpError;
      });

      await request(api)
        .post("/feedbacks")
        .send({
          is_useful: true,
          sessionID: "123",
        })
        .expect(409);
    });

    it("returns 200 when is possible to create", async () => {
      vi.spyOn(models, "feedbacks").mockImplementationOnce(() => ({
        create: () => ({ id: 1 }),
      }));

      await request(api)
        .post("/feedbacks")
        .send({
          is_useful: true,
          sessionID: "123",
        })
        .expect(200);
    });
  });
});
