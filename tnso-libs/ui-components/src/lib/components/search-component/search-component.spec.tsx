import { render } from "@testing-library/react";

import TNSOSearch from "./search-component";

describe("TNSOSearch", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSOSearch />);
    expect(baseElement).toBeTruthy();
  });
});
