import { getColumnSearchProps } from "../tableConfig";
import { builderLVCQueryParams } from "./tableConfig";

describe("getColumnSearchProps", () => {
  // Returns an object with filterDropdown and filterIcon properties.
  it("should return an object with filterDropdown and filterIcon properties", () => {
    const result = getColumnSearchProps("dataIndex");
    expect(result).toHaveProperty("filterDropdown");
    expect(result).toHaveProperty("filterIcon");
  });

  // Returns a QueryParams object with only startAtRecord and recordsPerPage set to the correct values when currentPage is 0
  it("should return a QueryParams object with only startAtRecord and recordsPerPage set to the correct values when currentPage is 0", () => {
    const queryParams = builderLVCQueryParams({ currentPage: 0 });
    expect(queryParams).toEqual({
      startAtRecord: 0,
      recordsPerPage: 10
    });
  });

  // Returns a QueryParams object with tableFilters added when tableFilters are passed
  it("should return a QueryParams object with tableFilters added when tableFilters are passed", () => {
    const tableFilters = { search: "test", status: "active" };
    const queryParams = builderLVCQueryParams({ tableFilters });
    expect(queryParams).toEqual({
      startAtRecord: 0,
      recordsPerPage: 10,
      search: "test",
      status: "active"
    });
  });
});
