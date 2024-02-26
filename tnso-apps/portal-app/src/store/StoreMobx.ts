import acna, { IACNA } from "./acna/ACNA";
import auth, { IAuth } from "./auth/Auth";
import companyProfile, { ICompanyProfile } from "./companyProfile/CompanyProfile";
import customizer, { ICustomizer } from "./customizer/Customizer";
import device, { IDevice } from "./device/Device";
import detail, { IDetail } from "./device/detail/Detail";
import lvc, { ILVC } from "./device/lvc/LVC";
import note, { INote } from "./device/note/Note";
import uptime, { IUptime } from "./device/uptime/Uptime";
import membersConnectivity, { IMemberConnectivity } from "./memberConnectivity/MemberConnectivity";
import shared, { IShared } from "./shared/Shared";
import user, { IUser } from "./user/User";
import changeTicket, { IChangeTicket } from "./changeTickets/ChangeTicket";
import geolocation, { IGeolocation } from "./device/geolocation/Geolocation";
import filter, { IFilter } from "./device/filter/Filter";
import cellularSignal, { ICellularSignal } from "./device/cellularSignal/CellularSignal";
import cellularUsage, { ICellularUsage } from "./device/cellularUsage/CellularUsage";
import group, { IGroup } from "./group/Group";

interface Store {
  customizer: ICustomizer;
  user: IUser;
  companyProfile: ICompanyProfile;
  acna: IACNA;
  auth: IAuth;
  member: IMemberConnectivity;
  devices: IDevice;
  device: {
    detail: IDetail;
    uptime: IUptime;
    note: INote;
    lvc: ILVC;
    geolocation: IGeolocation;
    filter: IFilter;
    cellularSignal: ICellularSignal;
    cellularUsage: ICellularUsage;
  };
  group: IGroup;
  changeTicket: IChangeTicket;
  shared: IShared;
}

export const store: Store = {
  customizer: customizer,
  user: user,
  companyProfile: companyProfile,
  acna: acna,
  auth: auth,
  member: membersConnectivity,
  devices: device,
  device: {
    detail: detail,
    uptime: uptime,
    note: note,
    lvc: lvc,
    geolocation: geolocation,
    filter: filter,
    cellularSignal: cellularSignal,
    cellularUsage: cellularUsage
  },
  group: group,
  changeTicket: changeTicket,
  shared: shared
};
