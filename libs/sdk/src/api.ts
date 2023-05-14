import fetch from "unfetch";
const API_URL = "http://localhost:3000";

type Feedback = {
  sessionID: string;
  isUseful: boolean;
};

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  feedbackVote: async (args: Feedback): Promise<Feedback> => {
    return fetch(`${API_URL}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((res) => {
      if (!res.ok) {
        throw new ApiError(`${res.statusText} (${res.status})`);
      }

      return res.json();
    });
  },
};
