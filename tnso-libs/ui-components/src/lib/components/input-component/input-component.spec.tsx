import { render } from "@testing-library/react";

import TNSOInput from "./input-component";

describe("Input", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSOInput />);
    expect(baseElement).toBeTruthy();
  });
});
