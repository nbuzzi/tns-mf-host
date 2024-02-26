import { render } from "@testing-library/react";

import TNSOContainer from "./container";

describe("TNSOContainer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSOContainer>Container Test</TNSOContainer>);
    expect(baseElement).toBeTruthy();
  });
});
