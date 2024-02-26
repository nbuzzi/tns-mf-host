import { render } from "@testing-library/react";

import TNSOPagination from "./pagination-component";

describe("TNSOPagination", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TNSOPagination totalItems={10} pageSize={5} currentPage={1} handleGoToPage={() => {}} />);
    expect(baseElement).toBeTruthy();
  });
});
