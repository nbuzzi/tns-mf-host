import { render } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import ChangePassword from "./ResetPassword";

describe("ChangePassword", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
          <ChangePassword />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
