import { BaseService } from "./BaseService";

describe("BaseService", () => {
  // Tests that the GET method returns the expected response on success
  it("test_get_success", async () => {
    const response = await BaseService.get("mockPath", {});

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  // Tests that the POST method returns the expected response on success
  it("test_post_success", async () => {
    const response = await BaseService.post("mockPath", {});

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  // Tests that the PUT method returns the expected response on success
  it("test_put_success", async () => {
    const response = await BaseService.put("mockPath", {});

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  // Tests that the DELETE method returns the expected response on success
  it("test_delete_success", async () => {
    const response = await BaseService.remove("mockPath");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
