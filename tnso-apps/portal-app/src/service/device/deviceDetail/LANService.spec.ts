import { LANService } from "./LANService";

describe("LANService", () => {
  it("should be defined", async () => {
    const response = await LANService.getAll("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
