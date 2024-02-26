import { useExportDataTable } from "./useExportDataTable";

describe("code snippet", () => {
  // The function should correctly calculate the total number of requests needed to export all data.
  it("should correctly calculate the total number of requests", async () => {
    const totalRecords = 100;
    const pageSize = 10;
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: {} })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const fileName = "data";
    const mapperMethod = jest.fn().mockReturnValue([]);
    const handleExport = useExportDataTable(totalRecords, pageSize, fetchData, builderParams, fileName, mapperMethod);

    await handleExport();

    expect(fetchData.getAll).toHaveBeenCalledTimes(10);
    expect(builderParams).toHaveBeenCalledTimes(10);
  });

  // The function should correctly fetch all data from the API.
  it("should correctly fetch all data from the API", async () => {
    const totalRecords = 100;
    const pageSize = 10;
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: [] })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const fileName = "data";
    const mapperMethod = jest.fn().mockReturnValue([]);
    const handleExport = useExportDataTable(totalRecords, pageSize, fetchData, builderParams, fileName, mapperMethod);

    await handleExport();
    expect(builderParams).toHaveBeenCalledTimes(10);
  });
  // Tests that the mapper method is handled correctly
  it("test_handles_mapper_method_correctly", async () => {
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: [] })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const mapperMethod = jest.fn().mockReturnValue([{ id: "1" }]);
    const handleExport = useExportDataTable(10, 5, fetchData, builderParams, "file_name", mapperMethod);
    await handleExport();
    expect(mapperMethod).toHaveBeenCalledTimes(2);
    expect(builderParams).toHaveBeenCalledTimes(2);
  });
  // Tests that special params are handled correctly
  it("test_handles_special_params_correctly", async () => {
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: [] })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const handleExport = useExportDataTable(10, 5, fetchData, builderParams, "file_name", undefined, true, "special_params");
    await handleExport();
    expect(builderParams).toHaveBeenCalledTimes(2);
  });
  // Tests that undefined response data is handled correctly
  it("test_handles_undefined_response_data", async () => {
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({})
    };
    const builderParams = jest.fn().mockReturnValue({});
    const handleExport = useExportDataTable(10, 5, fetchData, builderParams, "file_name");
    await handleExport();
    expect(builderParams).toHaveBeenCalledTimes(2);
  });
  // Tests that undefined mapper method is handled correctly
  it("test_handles_undefined_mapper_method", async () => {
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: [] })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const handleExport = useExportDataTable(10, 5, fetchData, builderParams, "file_name", undefined);
    await handleExport();
    expect(builderParams).toHaveBeenCalledTimes(2);
  });

  it("should correctly handle special params", async () => {
    const totalRecords = 100;
    const pageSize = 10;
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: {} })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const fileName = "data";
    const mapperMethod = jest.fn().mockReturnValue([]);
    const isSpecialParams = true;
    const specialParams = "someSpecialParams";

    const handleExport = useExportDataTable(totalRecords, pageSize, fetchData, builderParams, fileName, mapperMethod, isSpecialParams, specialParams);

    await handleExport();

    expect(fetchData.getAll).toHaveBeenCalledWith(specialParams, expect.objectContaining({}));
  });

  it("should handle the case when mapperMethod is not defined", async () => {
    const totalRecords = 100;
    const pageSize = 10;
    const fetchData = {
      getAll: jest.fn().mockResolvedValue({ data: [] })
    };
    const builderParams = jest.fn().mockReturnValue({});
    const fileName = "data";
    const isSpecialParams = false;
    const handleExport = useExportDataTable(totalRecords, pageSize, fetchData, builderParams, fileName, undefined, isSpecialParams);

    await handleExport();

    expect(fetchData.getAll).toHaveBeenCalledWith(expect.objectContaining({}));
  });
});
