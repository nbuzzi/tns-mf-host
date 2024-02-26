import { render } from "@testing-library/react";
import NotAvailable from "./NotAvailable";

describe("NotAvailable", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
          <NotAvailable/>
    );
    expect(baseElement).toBeTruthy();
  });
});
