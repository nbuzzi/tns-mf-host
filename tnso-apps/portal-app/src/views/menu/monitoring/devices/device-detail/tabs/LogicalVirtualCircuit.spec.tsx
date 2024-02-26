import { render } from "@testing-library/react";
import { LogicalVirtualCircuits } from "./LogicalVirtualCircuits";

describe("LogicalVirtualCircuits", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
          <LogicalVirtualCircuits isMobile={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
