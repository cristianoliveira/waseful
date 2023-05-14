import habitat from "preact-habitat";
1;
import { api } from "./api";

import Widget, { FeedbackVote } from "./Widget";

const widget = habitat(Widget);

export type WasefulApi = {
  feedbackVote: (opts: {
    sessionID: string;
    isUseful: boolean;
  }) => Promise<void>;
};

type OnVoteCallback = (opts: { isUseful: boolean }) => void;

export type Waseful = {
  render: (opts: {
    selector: string;
    apiClient: WasefulApi;
    onVote?: OnVoteCallback;
  }) => void;
};

export const waseful: Waseful = {
  render: ({ selector, apiClient = api, onVote }) => {
    widget.render({
      selector,
      clean: true,
      defaultProps: {
        onVote: async ({ isUseful, sessionID }: FeedbackVote) => {
          await apiClient.feedbackVote({
            sessionID,
            isUseful,
          });

          onVote?.({ isUseful });
        },
      },
    });
  },
};
