import { render } from "@testing-library/react";
import { DevicesHeader } from "./DevicesHeader";

describe("DevicesHeader", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
          <DevicesHeader />
    );
    expect(baseElement).toBeTruthy();
  });
});
