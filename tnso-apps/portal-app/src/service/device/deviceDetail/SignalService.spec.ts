import { SignalService } from "./SignalService";

describe("SignalService", () => {
  it("should be defined", async () => {
    const response = await SignalService.getDataReport("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be defined", async () => {
    const response = await SignalService.getMostRecent("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be defined", async () => {
    const response = await SignalService.getNormalized("mock", "2022-01-01");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be defined", async () => {
    const response = await SignalService.getTNSSignal("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
