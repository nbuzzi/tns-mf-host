import { ConfigurationService } from "./ConfigurationService";

describe("ConfigurationService", () => {
  it("should be undefined", async () => {
    const response = await ConfigurationService.getAll("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
