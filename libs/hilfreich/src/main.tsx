import habitat from "preact-habitat";

import { api } from "./api";

import Widget, { FeedbackVote } from "./Widget";

const _habitat = habitat(Widget);

_habitat.render({
  selector: "#hilfreich",
  clean: true,
  defaultProps: {
    onVote: ({ isUseful, sessionID }: FeedbackVote) => {
      return api.feedbackVote({
        sessionID,
        isUseful,
      });
    },
  },
});
