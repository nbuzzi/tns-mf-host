import React from "react";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("should remove the logo text", () => {
    render(<Logo />);
    const spanElement = screen.queryByText(/Transaction/);
    const emElement = screen.queryByText(/Network Services/);

    expect(spanElement).toBeNull();
    expect(emElement).toBeNull();
  });
});
