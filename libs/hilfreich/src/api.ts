const API_URL = "http://localhost:3000";

type Feedback = {
  sessionID: string;
  isUseful: boolean;
};

export const api = {
  feedbackVote: async (args: Feedback): Promise<Feedback> => {
    return fetch(`${API_URL}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((res) => res.json());
  },
};
