import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MembersGrid } from "./MembersGrid";

describe("MembersGrid", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <MembersGrid />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
