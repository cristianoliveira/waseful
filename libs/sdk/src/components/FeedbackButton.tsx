type FeedbackButtonProps = {
  onVote: (isUseful: boolean) => void;
};

const FeedbackButton = ({ onVote }: FeedbackButtonProps) => {
  return (
    <div>
      <button
        data-testid="like-button"
        onClick={() => {
          onVote(true);
        }}
      >
        Helpful
      </button>
      <button
        data-testid="dislike-button"
        onClick={() => {
          onVote(false);
        }}
      >
        Unhelpful
      </button>
    </div>
  );
};

export default FeedbackButton;
