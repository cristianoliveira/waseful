import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import Widget from "./Widget";

describe("Feedback Widget", () => {
  const defaultProps = { onVote: vi.fn(), onReasonSubmit: vi.fn() };

  it("renders buttons to vote", () => {
    const props = { ...defaultProps };

    render(<Widget {...props} />);

    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    expect(screen.getByTestId("dislike-button")).toBeInTheDocument();
  });

  it("allows to vote by clicking on the like button", async () => {
    const props = { ...defaultProps, onVote: vi.fn() };

    render(<Widget {...props} />);

    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("like-button"));

    expect(props.onVote).toHaveBeenCalledWith({
      isUseful: true,
      sessionID: expect.any(String),
    });
  });

  it("allows to vote by clicking on the dislike button and give a reason", async () => {
    const sessionID = "123";
    const props = {
      ...defaultProps,
      sessionID,
      onVote: vi.fn(),
      onReasonSubmit: vi.fn(),
    };

    render(<Widget {...props} />);

    expect(screen.getByTestId("dislike-button")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("dislike-button"));

    expect(screen.getByTestId("reasons-form")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("reason-other"));
    await userEvent.type(
      screen.getByTestId("reason-more-info"),
      "Some more info"
    );

    expect(props.onVote).toHaveBeenCalledWith({
      isUseful: false,
      sessionID,
    });

    await userEvent.click(screen.getByTestId("reason-submit"));

    expect(props.onReasonSubmit).toHaveBeenCalledWith({
      sessionID,
      reason: "other",
      moreInfo: "Some more info",
    });
  });
});
