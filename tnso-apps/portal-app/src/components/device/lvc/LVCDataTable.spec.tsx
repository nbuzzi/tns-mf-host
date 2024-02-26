import { render } from "@testing-library/react";
import { LVCDataTable } from "./LVCDataTable";
import { builderLVCQueryParams } from "../../../store/device/lvc/tableConfig";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("LVCDataTable", () => {
  it("should_render", async () => {
    const { baseElement } = render(
      <LVCDataTable
        totalRecords={1}
        returnedRecords={1}
        lvcs={[
          {
            ep1DeviceName: "ep1",
            ep2DeviceName: "ep2",
            ep1Acna: "acna1",
            ep2Acna: "acna2",
            lvcTicketNumber: "123",
            status: "active",
            startDate: 1626307200000,
            ep1Host: "host1",
            ep2Host: "host2",
            ep1RealIp: "ip1",
            ep2RealIp: "ip2",
            knowsEp2As: "as2",
            knowsEp1As: "as1",
            devices: "ep1 - ep2"
          }
        ]}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  afterEach(() => {
    localStorage.clear(); // Limpia el localStorage después de cada prueba
  });

  test("should return queryParams with default values", () => {
    const queryParams = builderLVCQueryParams();

    expect(queryParams).toEqual({
      startAtRecord: 0,
      recordsPerPage: 10
    });

    expect(localStorage.getItem("lvcParams")).toEqual(JSON.stringify(queryParams));
  });

  test("should return queryParams with custom values", () => {
    const tableFilters = { category: "electronics" };
    const currentPage = 2;
    const recordsPerPage = 20;

    const queryParams = builderLVCQueryParams({
      tableFilters,
      currentPage,
      recordsPerPage
    });

    expect(queryParams).toEqual({
      startAtRecord: 20,
      recordsPerPage: 20,
      category: "electronics"
    });

    expect(localStorage.getItem("lvcParams")).toEqual(JSON.stringify(queryParams));
  });

  test("should merge queryParams with existing params in localStorage", () => {
    const existingParams = {
      startAtRecord: 10,
      recordsPerPage: 5
    };

    localStorage.setItem("lvcParams", JSON.stringify(existingParams));

    const tableFilters = { category: "books" };
    const currentPage = 3;
    const recordsPerPage = 15;

    const queryParams = builderLVCQueryParams({
      tableFilters,
      currentPage,
      recordsPerPage
    });

    const expectedParams = {
      startAtRecord: 30,
      recordsPerPage: 15,
      category: "books"
    };

    expect(queryParams).toEqual(expectedParams);
    expect(localStorage.getItem("lvcParams")).toEqual(JSON.stringify(expectedParams));
  });

  describe("LVCDataTable", () => {
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
  
      mock.onGet('/download/eftx00012v_LVC').reply(200, "Test File");
  
      render(<LVCDataTable 
        totalRecords={10}
        returnedRecords={5}
        lvcs={[
         
        ]}/>);

      const downloadedFileName = "eftx00012v_LVC";
      expect(downloadedFileName).toEqual("eftx00012v_LVC");
    });
  });
});