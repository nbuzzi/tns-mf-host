import { GroupService } from "./GroupService";

describe("GroupService", () => {
  it("getAll", async () => {
    const response = await GroupService.getAll();

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("getById", async () => {
    const response = await GroupService.getById("1");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("getByParentId", async () => {
    const response = await GroupService.getByParentId(1);

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("create", async () => {
    const response = await GroupService.create({
      acna: "test",
      knownAs: "test",
      totalNumberOfDevices: 1,
      companyName: "test"
    });

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("update", async () => {
    const response = await GroupService.update({
      acna: "test",
      knownAs: "test",
      totalNumberOfDevices: 1,
      companyName: "test"
    });

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("getByMemberName", async () => {
    const response = await GroupService.getByMemberName("test");

    expect(response).toEqual({ data: undefined, status: undefined });
  });
});
