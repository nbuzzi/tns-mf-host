import { render } from "@testing-library/react";
import { DevicesReactTable } from "./DevicesReactTable";
import { BrowserRouter } from "react-router-dom";

describe("DevicesReactTable", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <DevicesReactTable />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
