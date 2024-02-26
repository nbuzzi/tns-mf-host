import { render } from "@testing-library/react";
import { LongTextTooltip } from "./LongTextTooltip";

describe("LongTextTooltip", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LongTextTooltip />);
    expect(baseElement).toBeTruthy();
  });
});
