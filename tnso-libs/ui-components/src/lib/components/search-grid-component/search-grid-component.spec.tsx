import { render } from "@testing-library/react";

import TNSOSearchGrid from "./search-grid-component";

describe("TNSOSearchGrid", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSOSearchGrid keyFilter="" onReset={() => {}} onSearch={() => {}} themeSelected={"light"} />);
    expect(baseElement).toBeTruthy();
  });
});
