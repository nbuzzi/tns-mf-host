import { NoteService } from "./NoteService";

describe("NoteService", () => {
  it("should be defined", async () => {
    const response = await NoteService.getAll("mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });

  it("should be defined", async () => {
    const response = await NoteService.update({ note: "" }, "mock");

    expect(response).toEqual({
      data: undefined,
      status: undefined
    });
  });
});
