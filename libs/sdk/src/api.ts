import fetch from "unfetch";
const { API_URL = null } = process.env;

if (!API_URL) {
  throw new Error("Missing environment variable API_URL.");
}

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  postFeedback: async (args: Feedback): Promise<Feedback> => {
    // eslint-disable-next-line
    return fetch(`${API_URL}\/feedbacks`, {
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

  postReason: async (args: FeedbackReason): Promise<FeedbackReason> => {
    // eslint-disable-next-line
    return fetch(`${API_URL}\/reasons`, {
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
