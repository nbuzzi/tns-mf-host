import { store } from "../../../store/StoreMobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { NoteService } from "../../../service/device/deviceDetail/NoteService";
import { MessageHelper } from "../../../helpers/shared/MessageHelper";

describe("Note", () => {
  // Tests that data is loaded successfully
  it("test_load_data_successfully", async () => {
    const note = store.device.note;
    const mockResponse = {
      status: StatusCode.OK,
      data: {
        note: "test note"
      }
    };
    NoteService.getAll = jest.fn().mockResolvedValue(mockResponse);
    await note.loadData("testDevice");
    expect(NoteService.getAll).toHaveBeenCalled();
    expect(note.data?.note).toEqual("test note");
  });

  // Tests that note is updated successfully
  it("test_update_note_successfully", async () => {
    const note = store.device.note;
    const mockResponse = {
      status: StatusCode.NO_CONTENT
    };
    NoteService.update = jest.fn().mockResolvedValue(mockResponse);
    NoteService.getAll = jest.fn().mockResolvedValue({
      status: StatusCode.OK,
      data: {
        note: "updated note"
      }
    });
    await note.update({ note: "new note" }, "testDevice");
    expect(NoteService.update).toHaveBeenCalled();
    expect(NoteService.getAll).toHaveBeenCalled();
    expect(note.data?.note).toEqual("updated note");
  });
});
