import { render } from "@testing-library/react";
import { HistoricalData } from "./HistoricalData";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("HistoricalData", () => {
    let mock;
  
    beforeAll(() => {
    mock = new MockAdapter(axios);
    });
  
    afterAll(() => {
    mock.restore();
    });
  
    it("Should name the file with the name of the device", async () => {
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: () => ({
          deviceName: "eftx00012v",
        }),
      }));
  
      mock.onGet('/download/eftx00012v_CellularUsageHistoricalData').reply(200, "Test File");
        const downloadedFileName = "eftx00012v_CellularUsageHistoricalData";
      expect(downloadedFileName).toEqual("eftx00012v_CellularUsageHistoricalData");
    });
  });
  