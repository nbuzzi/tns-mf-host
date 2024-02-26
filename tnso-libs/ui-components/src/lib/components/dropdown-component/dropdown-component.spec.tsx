import { render } from "@testing-library/react";

import TNSODropdown from "./dropdown-component";

describe("Dropdown", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSODropdown>Dropdown Button Test</TNSODropdown>);
    expect(baseElement).toBeTruthy();
  });
});
