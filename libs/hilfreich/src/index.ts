import habitat from "preact-habitat";

import { api } from "./api";

import Widget, { FeedbackVote } from "./Widget";

const _habitat = habitat(Widget);

_habitat.render({
  selector: "#hilfreich-host",
  clean: true,
  defaultProps: {
    onVote: ({ isUseful, sessionID }: FeedbackVote) => {
      api.feedbackVote({
        sessionID,
        isUseful,
      });
    },
  },
});
