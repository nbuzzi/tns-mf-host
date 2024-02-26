import { UptimeService } from "./UptimeService";

describe("UptimeService", () => {
  it("should be defined", async () => {
    const response = await UptimeService.getDaily("mock", "2022-01-01");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be defined", async () => {
    const response = await UptimeService.getMonthly("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
