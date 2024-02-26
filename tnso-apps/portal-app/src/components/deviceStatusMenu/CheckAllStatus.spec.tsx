import { render } from "@testing-library/react";
import { CheckAllStatus, CheckAllStatusProps } from "./CheckAllStatus";

const mockedData: CheckAllStatusProps = {
  status: {
    onPrimary: 2,
    offline: 2,
    onBackup: 0,
    unknown: 1,
    indeterminate: 2
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleStautsesSelects: () => {}
};

describe("CheckAllStatus ", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CheckAllStatus status={mockedData.status} toggleStautsesSelects={mockedData.toggleStautsesSelects} />);
    expect(baseElement).toBeTruthy();
  });
});
