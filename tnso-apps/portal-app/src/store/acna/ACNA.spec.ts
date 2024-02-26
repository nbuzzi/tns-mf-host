import { ACNAService } from "../../service/acna/ACNAService";
import { store } from "../StoreMobx";

describe("ACNAStore", () => {
  // Tests that loadData handles empty response
  it("test_load_data_empty_response", async () => {
    ACNAService.getAll = jest.fn().mockResolvedValueOnce(undefined);
    await store.acna.loadData();
    expect(store.acna.data).toBeUndefined();
    expect(store.acna.acnas).toBeUndefined();
  });

  // Tests that loadData handles error response
  it("test_load_data_error_response", async () => {
    ACNAService.getAll = jest.fn().mockRejectedValueOnce(undefined);
    await store.acna.loadData();
    expect(store.acna.data).toBeUndefined();
    expect(store.acna.acnas).toBeUndefined();
  });

  it("test_load_data_success", async () => {
    ACNAService.getAll = jest.fn().mockResolvedValueOnce({
      data: {
        acnas: [
          { name: "ACNA1", knownAs: "A1" },
          { name: "ACNA2", knownAs: "A2" }
        ]
      }
    });
    await store.acna.loadData();
    expect(store.acna.data).toBeDefined();
    expect(store.acna.acnas).toBeDefined();
  });

  // Tests that getData returns expected data
  it("test_get_data_success", () => {
    store.acna.acnas = [
      { name: "ACNA1", knownAs: "A1" },
      { name: "ACNA2", knownAs: "A2" }
    ];
    const data = store.acna.getData();
    expect(data).toEqual(store.acna.acnas);
  });

  // Tests that cleanavailableDataAndAssociatedData successfully cleans availableData and associatedData
  it("test_clean_data_success", () => {
    store.acna.availableData = { totalRecords: 1, returnedRecords: 1, acnas: [{ name: "ACNA1", knownAs: "A1" }] };
    store.acna.associatedData = { totalRecords: 1, returnedRecords: 1, acnas: [{ name: "ACNA2", knownAs: "A2" }] };
    store.acna.cleanavailableDataAndAssociatedData();
    expect(store.acna.availableData).toBeUndefined();
    expect(store.acna.associatedData).toBeUndefined();
  });

  // Tests that getData handles undefined acnas
  it("test_get_data_undefined", () => {
    const data = store.acna.getData();
    expect(data).toBeDefined();
  });
});
