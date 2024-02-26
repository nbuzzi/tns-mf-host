import { render } from "@testing-library/react";
import { Uptime } from "./Uptime";

describe("Uptime", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
          <Uptime />
    );
    expect(baseElement).toBeTruthy();
  });
});
