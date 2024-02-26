import { LVCService } from "./LVCService";

describe("LVCService", () => {
    it("should be defined", async() => {
        const response = await LVCService.getAll("mock"); 

        expect(response).toEqual({
            data: undefined,
            status: undefined
        })
    });
})