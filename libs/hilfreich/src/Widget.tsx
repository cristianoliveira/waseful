import { h } from "preact";
import uuidv4 from "uuid/dist/v4";

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
