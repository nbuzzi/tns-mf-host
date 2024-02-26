import { CompanyProfile, CompanyProfileWithACNAs } from "../../interfaces/companyProfiles/company";
import { DeviceAddress, DeviceTable } from "../../interfaces/devices/devices";
import { DevicesResponse, LVCResponse } from "../../interfaces/devices/response/response";
import { LVCTable } from "../../interfaces/devices/lvc/lvc";
import { ACNA } from "../../interfaces/companyProfiles/acna/acna";
import { ChangeTicketsExport, ChangeTicketsResponse } from "../../interfaces/changeTickets/changeTickets";
import { DateHelper } from "./DateHelper";
import { store } from "../../store/StoreMobx";
import { CellularSignal, CellularSignalExport, Period } from "../../interfaces/devices/cellular/cellularSignal";
import { User, UserStatus, UserTable } from "../../interfaces/users/user";
import { ExportMemberTable, MembersExportResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { CellularUsage, CellularUsageTable } from "../../interfaces/devices/cellular/cellularUsage";
import { UnitConvertHelper } from "./UnitConvertHelper";
import i18n from "../../i18n";
import { TRANSLATION } from "../../utils/const/translation";
import { Roles, RolesByUserList } from "../../interfaces/auth/roleAndPermission/role";

interface AddressComponentTypes {
  street_number?: string;
  route?: string;
  neighborhood?: string;
  locality?: string;
  administrative_area_level_1?: string;
  administrative_area_level_2?: string;
  country?: string;
  postal_code?: string;
  postal_town?: string;
}

enum AddressComponentEnum {
  streetNumber = "street_number",
  route = "route",
  neighborhood = "neighborhood",
  locality = "locality",
  administrative_area_level_1 = "administrative_area_level_1",
  administrative_area_level_2 = "administrative_area_level_2",
  country = "country",
  postal_code = "postal_code",
  postal_town = "postal_town"
}

export class MapperHelper {
  public static mapLVC(source?: LVCResponse): LVCTable[] {
    if (source && source.lvcs) {
      const dataMapped = source.lvcs.map((item) => {
        return {
          lvcTicketNumber: item.lvcTicketNumber,
          status: item.status,
          devices: `${item.ep1DeviceName} - ${item.ep2DeviceName}`,
          startDate: item.startDate,
          ep1Acna: item.ep1Acna,
          ep1Host: item.ep1Host,
          ep1RealIp: item.ep1RealIp,
          knowsEp2As: item.knowsEp2As,
          ep2Acna: item.ep2Acna,
          ep2Host: item.ep2Host,
          ep2RealIp: item.ep2RealIp,
          knowsEp1As: item.knowsEp1As
        };
      });
      return dataMapped;
    } else {
      return [];
    }
  }

  public static mapLVCExport(source?: LVCResponse): LVCTable[] {
    const timeZone = store.auth.userInfo?.timeZone;
    if (source && source.lvcs) {
      const dataMapped = source.lvcs.map((item) => {
        const startDate = item.startDate
          ? new Date(item.startDate * 1000).toLocaleString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone
            })
          : "";
        const formattedDateWithoutDots = startDate.replace(/\.(\s)?/g, "");
        return {
          "LVC Ticket Number": item.lvcTicketNumber,
          Status: item.status,
          Devices: `${item.ep1DeviceName} - ${item.ep2DeviceName}`,
          "Start Date": formattedDateWithoutDots,
          "EP1 ACNA": item.ep1Acna,
          "EP1 Host": item.ep1Host,
          "EP1 Real IP": item.ep1RealIp,
          "Knows EP2 As": item.knowsEp2As,
          "EP2 ACNA": item.ep2Acna,
          "EP2 Host": item.ep2Host,
          "EP2 Real IP": item.ep2RealIp,
          "Knows EP1 As": item.knowsEp1As
        };
      });
      return dataMapped as unknown as LVCTable[];
    } else {
      return [];
    }
  }

  public static mapCompanyProfile(source: CompanyProfileWithACNAs[]): CompanyProfile[] {
    const dataMapped = source.map((item) => {
      return {
        ...item,
        acnas: item.acnas?.map((acna) => acna.name + "-" + acna.knownAs).join(",")
      };
    });
    return dataMapped;
  }

  public static mapDevices(source?: DevicesResponse): DeviceTable[] {
    if (source && source.devices) {
      const dataMapped = source.devices.map((device) => {
        return {
          "Has Geolocation": device.hasGeolocation ? "Yes" : "No",
          ACNA: device.acna,
          Company: device.knownAs,
          "Service Status": device.connectivityStatus,
          Country: device.country,
          "Customer Device Name": device.customerDeviceName,
          "Operational Status": device.operationalStatus,
          "TNS Device Name": device.tnsDeviceName
        };
      });
      return dataMapped as unknown as DeviceTable[];
    } else {
      return [];
    }
  }

  public static acnasToAcnasWithKnownAs(source: string): ACNA[] {
    const acnas = source.split(",");
    const acnasWithKnownAs = acnas.map((acna) => {
      const acnaWithKnownAs = acna.split("-");
      return {
        name: acnaWithKnownAs[0],
        knownAs: acnaWithKnownAs[1]
      };
    });
    return acnasWithKnownAs;
  }

  public static userToUserTable(source: User[]): UserTable[] {
    const dataMapped = source.map((item) => {
      return {
        username: item.username,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        status: item.credentialsExpired ? UserStatus.Expired : item.accountLocked ? UserStatus.Locked : item.enabled ? UserStatus.Enabled : UserStatus.Disabled,
        credentialsExpired: item.credentialsExpired,
        accountLocked: item.accountLocked,
        companyProfiles: item.companyProfiles,
        lastLogin: DateHelper.getDateFromTimestampWithTimeZone(Number("1634567890"), "America/New_York"),
        timeZone: item.timeZone,
        role: item.role
      };
    });
    return dataMapped;
  }

  public static mapChangeTicketsToExport(source?: ChangeTicketsResponse): ChangeTicketsExport[] {
    if (source && source.changeTickets) {
      const dataMapped = source.changeTickets.map((item) => {
        return {
          "Start Date/Time": DateHelper.getDateFromTimestampWithTimeZone(item.changeStartTime, store.auth.userInfo?.timeZone),
          "TNS Ticket": item.changeTicketId,
          "Company Name": item.companyName,
          "Reason for Change": item.changeDescription,
          Impact: item.impactType,
          Status: item.statusOfChange,
          "Max. Duration (Hrs)": item.maximumDuration.toFixed(1)
        };
      });
      return dataMapped;
    }
    return [];
  }

  public static acnasAndKnownAs(): ACNA[] {
    const acnas = store.acna.acnas || []; // We use and empty array in case acnas is undefined

    return acnas.map((acna) => {
      return {
        name: acna.name,
        knownAs: acna.knownAs
      };
    });
  }
  public static mapMembersExport(source?: MembersExportResponse): ExportMemberTable[] {
    const dataMapped: ExportMemberTable[] = [];

    if (source && source.members) {
      source.members.forEach((item) => {
        item.destMembers.forEach((destMember) => {
          destMember.srcAndDestDevicesDetails.forEach((detail) => {
            detail.interfaceDetails.forEach((interfaceDetail) => {
              const row: ExportMemberTable = {
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.sourceMember)]: item.acna + " - " + item.knownAs,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.destinationMember)]: detail.destAcna + " - " + detail.destKnownAs,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.statusOfMemberConnection)]: destMember.memberConnectivityStatus,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.sourceTNSDeviceName)]: detail.srcTnsDeviceName,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.sourceCustomerDeviceName)]: detail.srcCustomerDeviceName,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.destinationTNSDeviceName)]: detail.destTnsDeviceName,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.destinationCustomerDeviceName)]: detail.destCustomerDeviceName,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.wanInstance)]: interfaceDetail.interfaceType,
                [i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.tunnelStatus)]: interfaceDetail.interfaceStatus
              };
              dataMapped.push(row);
            });
          });
        });
      });
    }
    dataMapped.sort((a, b) => {
      const sourceMemberComparison = a[i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.sourceMember)].localeCompare(
        b[i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.sourceMember)]
      );
      if (sourceMemberComparison !== 0) {
        return sourceMemberComparison;
      }
      return a[i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.destinationMember)].localeCompare(b[i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.MAPPER.destinationMember)]);
    });
    return dataMapped;
  }

  static mapRawDataExport = (source?: CellularSignal[], interval?: string): CellularSignalExport[] => {
    if (source) {
      return source.map((item) => {
        const dateTime =
          interval === Period.Daily
            ? DateHelper.formatTimestampInHours(item.dateTime, store.auth.userInfo?.timeZone)
            : DateHelper.formatTimestampInDays(item.dateTime, store.auth.userInfo?.timeZone);
        return {
          "TNS Device Name": item.name,
          "Date Time": dateTime,
          "Technology Type": item.technologyType,
          "Norm Low": item.normLow,
          "Norm High": item.normHigh,
          "Norm Average": item.normAverage,
          "RSSI Average": item.rssiAverage,
          "RSRP Average": item.rsrpAverage,
          "RSRQ Average": item.rsrqAverage,
          "RSCP Average": item.rscpAverage,
          "EC/IO Average": item.ecioAverage,
          "SINR Average": item.sinrAverage,
          "EC/IO Count": item.ecioCount,
          "RSCP Count": item.rscpCount,
          "RSRQ Count": item.rsrqCount,
          "RSRP Count": item.rsrpCount,
          "SINR Count": item.sinrCount,
          "EC/IO Signal Quality": item.ecioSignalQuality,
          "Norm Signal Quality": item.normSignalQuality,
          "RSSI Signal Quality": item.rssiSignalQuality,
          "RSRP Signal Quality": item.rsrpSignalQuality,
          "RSRQ Signal Quality": item.rsrqSignalQuality,
          "RSCP Signal Quality": item.rscpSignalQuality,
          "SINR Signal Quality": item.sinrSignalQuality,
          "Model Name": item.modelName,
          Service: item.service
        };
      });
    } else {
      return [];
    }
  };

  public static mapUsageToExport(source?: CellularUsage[]): CellularUsageTable[] {
    if (source) {
      const dataMapped: CellularUsageTable[] = source
        .slice()
        .reverse()
        .map((item) => {
          const billingPeriod = `${DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(
            Number(item.startDate),
            "UTC"
          )} - ${DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(Number(item.endDate), "UTC")}`;
          return {
            "TNS Device Name": item.name,
            "Billing Period": billingPeriod,
            "Actual Data Plan": `${UnitConvertHelper.convertBytesToMegaBytes(item.planSize).toFixed(2)} MB`,
            "TX Data": `${UnitConvertHelper.convertBytesToMegaBytes(item.txcnt).toFixed(2)} MB`,
            "RX Data": `${UnitConvertHelper.convertBytesToMegaBytes(item.rxcnt).toFixed(2)} MB`,
            "Total Data": `${UnitConvertHelper.convertBytesToMegaBytes(item.txcnt + item.rxcnt).toFixed(2)} MB`,
            "Percent Consumed": `${item.percent}%`,
            "Actual Overage": `${UnitConvertHelper.convertBytesToMegaBytes(item.overage).toFixed(2)} MB`
          };
        });

      return dataMapped;
    }
    return [];
  }

  public static mapSelectedNewAddress(place: google.maps.places.PlaceResult): DeviceAddress {
    const placeAux: AddressComponentTypes = {};
    const deviceAddress: DeviceAddress = {
      street1: "",
      street2: "",
      city: "",
      state: "",
      countryCode: "",
      zipCode: "",
      latitude: "",
      longitude: ""
    };
    place.address_components?.map((component) => {
      Object.assign(placeAux, {
        [component.types[0]]:
          component.types[0] === AddressComponentEnum.administrative_area_level_1 || component.types[0] === AddressComponentEnum.country
            ? component.short_name
            : component.long_name
      });
    });

    deviceAddress.street1 = `${placeAux.street_number ?? ""} ${placeAux.route ?? ""}`;
    deviceAddress.city = placeAux.locality ?? placeAux.postal_town ?? deviceAddress.city;
    deviceAddress.state = placeAux.administrative_area_level_1 ?? deviceAddress.state;
    deviceAddress.countryCode = placeAux.country ?? deviceAddress.countryCode;
    deviceAddress.zipCode = placeAux.postal_code ?? deviceAddress.zipCode;
    deviceAddress.latitude = place.geometry?.location?.lat().toString() ?? deviceAddress.latitude;
    deviceAddress.longitude = place.geometry?.location?.lng().toString() ?? deviceAddress.longitude;
    return deviceAddress;
  }

  public static mapRolestoRolesByUserList(roles?: Roles): RolesByUserList {
    switch (roles) {
      case Roles.Admin:
        return RolesByUserList.Admin;
      case Roles.SuperUser:
        return RolesByUserList.SuperUser;
      default:
        return RolesByUserList.Basic;
    }
  }
}
