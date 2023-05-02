import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import Widget from "./Widget";

describe("Feedback Widget", () => {
  const defaultProps = { onVote: vi.fn() };

  it("renders buttons to vote", () => {
    const props = { ...defaultProps };

    render(<Widget {...props} />);

    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    expect(screen.getByTestId("dislike-button")).toBeInTheDocument();
  });

  it("allows to vote by clicking on the like or dislike button", async () => {
    const props = { ...defaultProps, onVote: vi.fn() };

    render(<Widget {...props} />);

    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("like-button"));

    expect(props.onVote).toHaveBeenCalledWith({
      isUseful: true,
      sessionID: expect.any(String),
    });

    expect(screen.getByTestId("dislike-button")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("dislike-button"));

    expect(props.onVote).toHaveBeenCalledWith({
      isUseful: false,
      sessionID: expect.any(String),
    });
  });
});
