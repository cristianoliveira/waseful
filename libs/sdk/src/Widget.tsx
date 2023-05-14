import { v4 as uuidv4 } from "uuid";
import { useState } from "preact/hooks";

import "./styles.css";

import ReasonsForm from "./components/ReasonsForm";

type WidgetProps = {
  onVote: (vote: Feedback) => void;
  onReasonSubmit: (reasons: ReasonAnswer) => void;
  sessionID?: string;
};

enum Vote {
  None = 0,
  Like = 1,
  Dislike = 2,
}

export default function Widget({
  sessionID = uuidv4(),
  onVote,
  onReasonSubmit,
}: WidgetProps) {
  const [vote, setVote] = useState<Vote>(Vote.None);
  return (
    <div>
      <button
        data-testid="like-button"
        onClick={() => {
          onVote({ isUseful: true, sessionID });
          setVote(Vote.Like);
        }}
      >
        Like
      </button>
      <button
        data-testid="dislike-button"
        onClick={() => {
          onVote({ isUseful: false, sessionID });
          setVote(Vote.Dislike);
        }}
      >
        Dislike
      </button>
      {vote === Vote.Dislike && (
        <ReasonsForm sessionID={sessionID} onSubmit={onReasonSubmit} />
      )}
    </div>
  );
}
