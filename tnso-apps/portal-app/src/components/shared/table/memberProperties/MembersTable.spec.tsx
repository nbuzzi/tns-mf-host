import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MembersTable } from "./MembersTable";

describe("MembersGrid", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <MembersTable />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
