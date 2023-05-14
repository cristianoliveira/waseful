import fetch from "unfetch";
const { API_URL } = process.env;

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  postFeedback: async (args: Feedback): Promise<Feedback> => {
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

  postReason: async (args: ReasonAnswer): Promise<any> => {
    console.log("@@@@@@ args: ", args);
    // return fetch(`${API_URL}\/reasons`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(args),
    // }).then((res) => {
    //   if (!res.ok) {
    //     throw new ApiError(`${res.statusText} (${res.status})`);
    //   }

    //   return res.json();
    // });
  },
};
