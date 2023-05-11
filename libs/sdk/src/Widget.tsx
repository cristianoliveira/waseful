import { v4 as uuidv4 } from "uuid";

import "./styles.css";

export type FeedbackVote = {
  isUseful: boolean;
  sessionID: string;
};

type WidgetProps = {
  onVote: (vote: FeedbackVote) => void;
  sessionID?: string;
};

export default function Widget({ sessionID = uuidv4(), onVote }: WidgetProps) {
  return (
    <div>
      <button
        data-testid="like-button"
        onClick={() => {
          onVote({ isUseful: true, sessionID });
        }}
      >
        Like
      </button>
      <button
        data-testid="dislike-button"
        onClick={() => {
          onVote({ isUseful: false, sessionID });
        }}
      >
        Dislike
      </button>
    </div>
  );
}
