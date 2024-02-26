import { render } from "@testing-library/react";
import { MonthDateSelector } from "./MonthDateSelector";

describe("MonthDateSelector", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MonthDateSelector switchView={() => {}} />);
    expect(baseElement).toBeTruthy();
  });

  it("should render the current month", () => {
    const { getAllByText } = render(<MonthDateSelector switchView={() => {}} />);
    expect(getAllByText(/label/gi)).toBeDefined();
  });
});
