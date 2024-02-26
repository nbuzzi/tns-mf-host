import { MemberConnectivityService } from "./MemberConnectivityService";
import { MemberExportService } from "./MemberExportService";

describe("MemberService", () => {
  it("should be undefined", async () => {
    const response = await MemberConnectivityService.getAll();

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await MemberConnectivityService.getConnectedGraph("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await MemberExportService.getAll();

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await MemberConnectivityService.getHasMemberConnectivity();

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be undefined", async () => {
    const response = await MemberConnectivityService.getHasMemberDevice("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
