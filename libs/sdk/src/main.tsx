import habitat from "preact-habitat";
import { api } from "./api";

import Widget from "./Widget";

const widget = habitat(Widget);

export const waseful: Waseful = {
  render: ({ selector, apiClient = api, onVote, onReasonSubmit }) => {
    widget.render({
      selector,
      clean: true,
      defaultProps: {
        onVote: async (postFeedback: Feedback) => {
          await apiClient.postFeedback(postFeedback);

          onVote?.(postFeedback);
        },

        onReasonSubmit: async (reasons: FeedbackReason) => {
          await apiClient.postReason(reasons);

          onReasonSubmit?.(reasons);
        },
      },
    });
  },
};
