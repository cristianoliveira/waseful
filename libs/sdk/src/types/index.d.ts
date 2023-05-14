type Feedback = {
  sessionID: string;
  isUseful: boolean;
};

type ReasonAnswer = {
  sessionID: string;
  reason: Reason;
  moreInfo: string;
};

type WasefulApi = {
  postFeedback: (args: Feedback) => Promise<void>;
  postReason: (args: ReasonAnswer) => Promise<void>;
};

type OnVoteCallback = (opts: Feedback) => void;
type OnReasonSubmit = (opts: ReasonAnswer) => void;

type Waseful = {
  render: (opts: {
    selector: string;
    apiClient: WasefulApi;
    onVote?: OnVoteCallback;
    onReasonSubmit?: OnReasonSubmit;
  }) => void;
};
