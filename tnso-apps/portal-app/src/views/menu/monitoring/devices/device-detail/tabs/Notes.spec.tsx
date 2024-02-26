import { render } from "@testing-library/react";
import { Notes } from "./Notes";

describe("Notes", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
          <Notes />
    );
    expect(baseElement).toBeTruthy();
  });
});
