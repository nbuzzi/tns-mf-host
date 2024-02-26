import { ACNAService } from "./ACNAService";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

describe("ACNAService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should call get method with response undefined", async () => {
      const response = await ACNAService.getAll();

      expect(response).toEqual({ data: undefined, status: undefined });
    });

    it("should call get method with response undefined", async () => {
      const response = await ACNAService.getAssociatedByCompanyProfile("companyProfileName");

      expect(response).toEqual({ data: undefined, status: undefined });
    });

    it("should call get method with response undefined", async () => {
      const response = await ACNAService.getAvailablesByCompanyProfile("companyProfileName");

      expect(response).toEqual({ data: undefined, status: undefined });
    });
  });
});
