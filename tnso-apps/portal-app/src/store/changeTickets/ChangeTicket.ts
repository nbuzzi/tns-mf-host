import { makeAutoObservable } from "mobx";
import {
  ChangeTicketDetails,
  ChangeTicket as ChangeTicketModel,
  ChangeTicketsParams,
  ChangeTicketsResponse,
  ScheduleGraph,
  ScheduleGraphResponse
} from "../../interfaces/changeTickets/changeTickets";
import { ChangeTicketService } from "../../service/changeTicket/ChangeTicketService";

export interface IChangeTicket {
  data?: ChangeTicketsResponse;
  changeTickets?: ChangeTicketModel[];
  changeTicket?: ChangeTicketDetails;
  scheduleData?: ScheduleGraphResponse;
  scheduleGraph?: ScheduleGraph[];
  isGridView: boolean;
  currentTitle: TitleView;
  currentTextView: TypeView;
  currentTablePage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentViewMode: any;

  loadData: (params?: ChangeTicketsParams) => Promise<void>;
  loadScheduleGraph: (params?: ChangeTicketsParams) => Promise<void>;
  loadScheduleDevice: (changeTicketId: string) => Promise<ScheduleGraphResponse | undefined>;
  loadDataByTicketId: (changeTicketId: string) => Promise<void>;
  setCurrentTablePage: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentViewMode: (viewMode: any) => void;
  toggleTextView: () => void;
  toggleCurrentView: () => void;
  clearData: () => void;
  clearScheduleGraph: () => void;
}

export enum TypeView {
  Grid = "gridView",
  Schedule = "scheduleView"
}

export enum TitleView {
  Grid = "changeTickets",
  Schedule = "changeSchedule"
}

class ChangeTicket implements IChangeTicket {
  data?: ChangeTicketsResponse = undefined;
  changeTickets?: ChangeTicketModel[] = undefined;
  changeTicket?: ChangeTicketDetails = undefined;
  scheduleData?: ScheduleGraphResponse = undefined;
  scheduleGraph?: ScheduleGraph[] = undefined;
  currentTextView = TypeView.Grid;
  currentTitle = TitleView.Grid;
  isGridView = false;
  currentTablePage = 1;
  currentViewMode = "day";

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (params?: ChangeTicketsParams): Promise<void> => {
    try {
      const response = await ChangeTicketService.getAll(params);
      if (response?.data) {
        this.data = response.data;
        this.changeTickets = this.data?.changeTickets;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  loadScheduleGraph = async (params?: ChangeTicketsParams): Promise<void> => {
    try {
      const response = await ChangeTicketService.getScheduleGraph(params);
      if (response?.data) {
        this.scheduleData = response.data;
        this.scheduleGraph = this.scheduleData?.changeTickets;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  loadDataByTicketId = async (changeTicketId: string): Promise<void> => {
    try {
      this.changeTicket = undefined;
      const response = await ChangeTicketService.getByTicketId(changeTicketId);
      if (response?.data) {
        this.changeTicket = response.data;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  loadScheduleDevice = async (changeTicketId: string): Promise<ScheduleGraphResponse | undefined> => {
    try {
      const devices = await ChangeTicketService.getDevicesByTicketId(changeTicketId);
      const updatedTickets: ScheduleGraph[] | undefined = this.scheduleData?.changeTickets.map((ticket) => {
        if (ticket.changeTicketId === changeTicketId) {
          return {
            ...ticket,
            devices: devices?.data
          } as ScheduleGraph;
        }
        return ticket;
      });
      if (this.scheduleData) {
        const data: ScheduleGraphResponse = {
          ...this.scheduleData,
          changeTickets: updatedTickets || []
        };
        console.warn(data);
        return data;
      }
      return undefined;
    } catch (error) {
      console.warn(error);
    }
  };

  setCurrentTablePage = (page: number): void => {
    this.currentTablePage = page;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentViewMode = (viewMode: any): void => {
    this.currentViewMode = viewMode;
  };

  toggleTextView = (): void => {
    this.currentTextView = this.currentTextView === TypeView.Grid ? TypeView.Schedule : TypeView.Grid;
    this.currentTitle = this.currentTitle === TitleView.Grid ? TitleView.Schedule : TitleView.Grid;
  };

  toggleCurrentView = (): void => {
    this.isGridView = !this.isGridView;
  };

  clearData = (): void => {
    this.data = undefined;
    this.changeTickets = undefined;
  };

  clearScheduleGraph = (): void => {
    this.scheduleData = undefined;
    this.scheduleGraph = undefined;
  };
}

const changeTicket = new ChangeTicket();

export default changeTicket;
