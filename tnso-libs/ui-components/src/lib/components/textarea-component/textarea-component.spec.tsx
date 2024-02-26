import { render } from "@testing-library/react";

import TextareaComponent from "./textarea-component";

describe("TextareaComponent", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TextareaComponent />);
    expect(baseElement).toBeTruthy();
  });
});
