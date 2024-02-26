import { render } from "@testing-library/react";
import { GeneralCard } from "./GeneralCard";

describe("GeneralCard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GeneralCard isAddress={false} />);
    expect(baseElement).toBeTruthy();
  });
});
