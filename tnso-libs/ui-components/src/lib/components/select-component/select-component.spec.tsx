import { render } from "@testing-library/react";

import SelectComponent from "./select-component";

describe("SelectComponent", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SelectComponent />);
    expect(baseElement).toBeTruthy();
  });
});
