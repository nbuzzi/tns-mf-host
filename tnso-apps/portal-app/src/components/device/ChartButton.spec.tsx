import { render } from "@testing-library/react";
import { ChartButtons } from "./ChartButtons";

describe("ChartButtons", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
          <ChartButtons />
    );
    expect(baseElement).toBeTruthy();
  });
});
