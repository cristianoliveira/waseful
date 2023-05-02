import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/preact";

import Widget from "./Widget";

describe("Feedback Widget", () => {
  const defaultProps = { onVote: vi.fn() };

  it("renders buttons to vote", () => {
    const props = { ...defaultProps };

    render(<Widget {...props} />);

    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    expect(screen.getByTestId("dislike-button")).toBeInTheDocument();
  });
});
