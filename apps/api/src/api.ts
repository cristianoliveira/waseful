import express from "express";
import cors from "cors";

import * as feedbacks from "./handlers/feedbacks";
import * as reasons from "./handlers/reasons";

const app = express();

app.use(cors());
app.use(express.json());

app.post(feedbacks.endpoint, feedbacks.post);
app.get(feedbacks.endpoint, feedbacks.get);

app.post(reasons.endpoint, reasons.post);

export default app;
