import { ChangeTicketService } from "../../service/changeTicket/ChangeTicketService";
import { ChangeTicketDetails, ChangeTicketImpact, ChangeTicketsResponse, ChangeTicketStatus, ScheduleGraphResponse } from "../../interfaces/changeTickets/changeTickets";
import { store } from "../StoreMobx";
import { TitleView, TypeView } from "./ChangeTicket";

describe("ChangeManagementStore", () => {
  // Tests that loading data successfully sets the 'data' and 'changeTickets' properties
  it("test_load_data_success", async () => {
    const changeManagement = store.changeTicket;
    const mockResponse: ChangeTicketsResponse = {
      returnedRecords: 1,
      totalRecords: 1,
      changeTickets: [
        {
          changeDescription: "test",
          changeStartTime: 123345,
          changeTicketId: "1",
          companyName: "test",
          impactType: ChangeTicketImpact.Critical,
          maximumDuration: 6.5,
          statusOfChange: ChangeTicketStatus.Approved
        }
      ]
    };
    ChangeTicketService.getAll = jest.fn().mockResolvedValue({ data: mockResponse });
    await changeManagement.loadData();
    expect(changeManagement.data).toEqual(mockResponse);
    expect(changeManagement.changeTickets).toEqual(mockResponse.changeTickets);
  });

  // Tests that loading schedule graph successfully sets the 'schedulData' and 'scheduleGraph' properties
  it("test_load_schedule_graph_success", async () => {
    const changeManagement = store.changeTicket;
    const mockResponse: ScheduleGraphResponse = {
      returnedRecords: 1,
      totalRecords: 1,
      changeTickets: [
        {
          changeStartTime: 123345,
          changeTicketId: "1",
          deviceCount: 2,
          statusOfChange: ChangeTicketStatus.Approved
        }
      ]
    };
    ChangeTicketService.getScheduleGraph = jest.fn().mockResolvedValue({ data: mockResponse });
    await changeManagement.loadScheduleGraph();
    expect(changeManagement.scheduleData).toEqual(mockResponse);
    expect(changeManagement.scheduleGraph).toEqual(mockResponse.changeTickets);
  });

  // Tests that loading data by ticket ID successfully sets the 'changeTicket' property
  it("test_load_data_by_ticket_id_success", async () => {
    const changeManagement = store.changeTicket;
    const mockResponse: ChangeTicketDetails = {
      changeImpact: ChangeTicketImpact.Critical,
      changesPlanned: "6.5",
      changeStartTime: 123345,
      devices: [
        {
          customerDeviceName: "test",
          companyName: "test",
          customerSiteName: "test",
          merchantName: "test",
          tnsDeviceName: "test"
        }
      ],
      impactType: ChangeTicketImpact.Critical,
      maximumDuration: 6.5,
      statusOfChange: ChangeTicketStatus.Approved,
      reasonForChange: "test",
      type: "test"
    };
    ChangeTicketService.getByTicketId = jest.fn().mockResolvedValue({ data: mockResponse });

    await changeManagement.loadDataByTicketId("1");
    expect(changeManagement.changeTicket).toEqual(mockResponse);
  });

  // Tests that setting current table page updates the 'currentTablePage' property
  it("test_set_current_table_page", () => {
    const changeManagement = store.changeTicket;
    changeManagement.setCurrentTablePage(2);
    expect(changeManagement.currentTablePage).toEqual(2);
  });

  // Tests that clearing data sets 'data' and 'changeTickets' to undefined
  it("test_clear_data", () => {
    const changeManagement = store.changeTicket;
    changeManagement.data = undefined;
    changeManagement.changeTickets = undefined;
    changeManagement.clearData();
    expect(changeManagement.data).toBeUndefined();
    expect(changeManagement.changeTickets).toBeUndefined();
  });

  // Tests that clearing schedule graph sets 'schedulData' and 'scheduleGraph' to undefined
  it("test_clear_schedule_graph", () => {
    const changeManagement = store.changeTicket;
    changeManagement.scheduleData = undefined;
    changeManagement.scheduleGraph = undefined;
    changeManagement.clearScheduleGraph();
    expect(changeManagement.scheduleData).toBeUndefined();
    expect(changeManagement.scheduleGraph).toBeUndefined();
  });

  it("test_toggle_text_view", () => {
    const changeManagement = store.changeTicket;
    changeManagement.currentTextView = TypeView.Grid;
    changeManagement.currentTitle = TitleView.Schedule;
    changeManagement.toggleTextView();
    expect(changeManagement.currentTextView).toEqual("scheduleView");
    expect(changeManagement.currentTitle).toEqual("changeTickets");
  });

  it("test_load_schedule_device_success", async () => {
    const changeManagement = store.changeTicket;
    const changeTicketId = "1";
    const mockDevices = {
      data: [
        {
          customerDeviceName: "Device 1",
          companyName: "Company 1",
          customerSiteName: "Site 1",
          merchantName: "Merchant 1",
          tnsDeviceName: "TNS Device 1"
        },
        {
          customerDeviceName: "Device 2",
          companyName: "Company 2",
          customerSiteName: "Site 2",
          merchantName: "Merchant 2",
          tnsDeviceName: "TNS Device 2"
        }
      ]
    };
    ChangeTicketService.getDevicesByTicketId = jest.fn().mockResolvedValue({ data: mockDevices });

    changeManagement.scheduleData = {
      returnedRecords: 1,
      totalRecords: 1,
      changeTickets: [
        {
          changeStartTime: 123345,
          changeTicketId: "1",
          deviceCount: 2,
          statusOfChange: ChangeTicketStatus.Approved
        }
      ]
    };

    const result = await changeManagement.loadScheduleDevice(changeTicketId);
    expect(result).toEqual({
      ...changeManagement.scheduleData,
      changeTickets: changeManagement.scheduleData.changeTickets.map((ticket) => {
        if (ticket.changeTicketId === changeTicketId) {
          return {
            ...ticket,
            devices: mockDevices
          };
        }
        return ticket;
      })
    });
  });
});
