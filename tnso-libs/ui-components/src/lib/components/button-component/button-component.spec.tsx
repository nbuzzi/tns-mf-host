import { render } from "@testing-library/react";

import TNSOButtonProps from "./button-component";

describe("Button", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSOButtonProps>Text Button</TNSOButtonProps>);
    expect(baseElement).toBeTruthy();
  });
});
