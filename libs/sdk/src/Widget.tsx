import { v4 as uuidv4 } from "uuid";
import { useState } from "preact/hooks";

import "./styles.css";

import FeedbackButton from "./components/FeedbackButton";
import ReasonsForm from "./components/ReasonsForm";

type WidgetProps = {
  onVote: (isUseful: Feedback) => void;
  onReasonSubmit: (reasons: FeedbackReason) => void;
  sessionID?: string;
};

enum Vote {
  Useful = 1,
  NotUseful = 2,
}

export default function Widget({
  sessionID = uuidv4(),
  onVote,
  onReasonSubmit,
}: WidgetProps) {
  const [vote, setVote] = useState<Vote | null>(null);
  const [hasFinished, setHasFinished] = useState(false);
  if (hasFinished) {
    return <div>Thanks for your feedback!</div>;
  }

  const handleVote = (isUseful: boolean) => {
    setVote(isUseful ? Vote.Useful : Vote.NotUseful);
    onVote({ isUseful, sessionID });
    setHasFinished(isUseful);
  };

  const handleReasonSubmit = (reasons: FeedbackReason) => {
    onReasonSubmit(reasons);
    setHasFinished(true);
  };

  return (
    <div>
      {!vote && <FeedbackButton onVote={handleVote} />}
      {vote === Vote.NotUseful && (
        <ReasonsForm sessionID={sessionID} onSubmit={handleReasonSubmit} />
      )}
    </div>
  );
}
