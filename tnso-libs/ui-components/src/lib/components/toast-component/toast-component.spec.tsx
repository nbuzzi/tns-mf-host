import { render } from "@testing-library/react";

import TNSOToast from "./toast-component";

describe("ToastComponent", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <TNSOToast type="success" isClosable isShowIcon>
        Toast Message Test
      </TNSOToast>
    );
    expect(baseElement).toBeTruthy();
  });
});
