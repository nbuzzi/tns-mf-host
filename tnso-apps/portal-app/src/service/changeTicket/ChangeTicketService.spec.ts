import { ChangeTicketService } from "./ChangeTicketService";

describe("ChangeManagementService", () => {
  it("should call get method with response undefined", async () => {
    const response = await ChangeTicketService.getAll();

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should call get method with response undefined", async () => {
    const response = await ChangeTicketService.getByTicketId("ticketId");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should call get method with response undefined", async () => {
    const response = await ChangeTicketService.getDevicesByTicketId("ticketId");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should call get method with response undefined", async () => {
    const response = await ChangeTicketService.getScheduleGraph();

    expect(response).toEqual({ data: undefined, status: undefined });
  });
});
