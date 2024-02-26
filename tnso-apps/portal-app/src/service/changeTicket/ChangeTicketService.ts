import { Response } from "../../interfaces/api/api";
import { BaseService } from "../BaseService";
import { ChangeTicketDetails, ChangeTicketsParams, ChangeTicketsResponse, ScheduleGraphResponse } from "../../interfaces/changeTickets/changeTickets";
import { encodeParams } from "../../helpers/api/RequestHelper";

export class ChangeTicketService extends BaseService {
  static async getAll(params?: ChangeTicketsParams): Promise<Response<ChangeTicketsResponse> | undefined> {
    const urlSearchParams = encodeParams<ChangeTicketsParams>(params as ChangeTicketsParams);
    return this.get<ChangeTicketsResponse>("changetickets", urlSearchParams);
  }

  static async getByTicketId(changeTicketId: string): Promise<Response<ChangeTicketDetails> | undefined> {
    return this.get<ChangeTicketDetails>(`changetickets/${changeTicketId}`);
  }

  static async getDevicesByTicketId(changeTicketId: string): Promise<Response<ChangeTicketDetails> | undefined> {
    return this.get<ChangeTicketDetails>(`changetickets/${changeTicketId}/devices`);
  }

  static async getScheduleGraph(params?: ChangeTicketsParams): Promise<Response<ScheduleGraphResponse> | undefined> {
    const urlSearchParams = encodeParams<ChangeTicketsParams>(params as ChangeTicketsParams);
    return this.get<ScheduleGraphResponse>("changetickets/scheduleGraph", urlSearchParams);
  }
}
