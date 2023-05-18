type Feedback = {
  sessionID: string;
  isUseful: boolean;
};

type FeedbackReason = {
  sessionID: string;
  reason: Reason;
  moreInfo: string;
};

type WasefulApi = {
  postFeedback: (args: Feedback) => Promise<void>;
  postReason: (args: FeedbackReason) => Promise<void>;
};

type OnVoteCallback = (opts: Feedback) => void;
type OnReasonSubmitCallback = (opts: FeedbackReason) => void;

type Waseful = {
  render: (opts: {
    selector: string;
    apiClient: WasefulApi;
    onVote?: OnVoteCallback;
    onReasonSubmit?: OnReasonSubmitCallback;
  }) => void;

  tag: string;
};
