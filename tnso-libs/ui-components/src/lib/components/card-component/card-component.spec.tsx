import { render } from "@testing-library/react";

import TNSOCard from "./card-component";
import TNSOButton from "../button-component/button-component";

describe("Card", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <TNSOCard>
        <TNSOButton>Text Button</TNSOButton>
      </TNSOCard>
    );
    expect(baseElement).toBeTruthy();
  });
});
