import habitat from "preact-habitat";

import { api } from "./api";

import Widget, { FeedbackVote } from "./Widget";

const _habitat = habitat(Widget);

type WasefulApi = {
  feedbackVote: (opts: {
    sessionID: string;
    isUseful: boolean;
  }) => Promise<void>;
};

export type Waseful = {
  render: (opts: { selector: string; apiClient: WasefulApi }) => void;
};

export const waseful: Waseful = {
  render: ({ selector, apiClient = api }) => {
    _habitat.render({
      selector,
      clean: true,
      defaultProps: {
        onVote: ({ isUseful, sessionID }: FeedbackVote) => {
          return apiClient.feedbackVote({
            sessionID,
            isUseful,
          });
        },
      },
    });
  },
};
