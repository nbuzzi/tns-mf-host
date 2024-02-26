import { render } from "@testing-library/react";
// import i18n from "src/translations/i18n";
import BlankLayout from "./BlankLayout";

describe("BiankLayout", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BlankLayout />);
    expect(baseElement).toBeTruthy();
  });
});
