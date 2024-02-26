import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

describe("ForgotPassword", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
