import { render } from "@testing-library/react";
import { DateSelector } from "./DateSelector";

describe("DateSelector", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DateSelector />);
    expect(baseElement).toBeTruthy();
  });
});
