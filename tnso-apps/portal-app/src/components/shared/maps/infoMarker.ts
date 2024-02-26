import { i18nInstance as i18n } from "../../../i18n";
import { DeviceDetail } from "../../../interfaces/devices/devices";
import { TRANSLATION } from "../../../utils/const/translation";

export const content = (device?: DeviceDetail, isDeviceGroup?: boolean): string => {
  if (!device) {
    return "<div class='device-more-info'>There're no device information available at this moment.</div>";
  }

  const DEFAULT_CHARACTER = "-";

  const tnsDeviceName = device.tnsDeviceName ?? DEFAULT_CHARACTER;
  const customerDeviceName = device.customerDeviceName ?? DEFAULT_CHARACTER;
  const operationalStatus = device.operationalStatus ?? DEFAULT_CHARACTER;
  const connectivityStatus = device.connectivityStatus ?? DEFAULT_CHARACTER;
  const model = device.model ?? DEFAULT_CHARACTER;
  const streetAddress = device.streetAddress ?? DEFAULT_CHARACTER;
  const city = device.city ?? DEFAULT_CHARACTER;
  const state = device.state ?? DEFAULT_CHARACTER;
  const zipCode = device.zipCode ?? DEFAULT_CHARACTER;
  const country = device.country ?? DEFAULT_CHARACTER;

  const response = `<div class="device-more-info">
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.tnsDeviceName)}: </b>${tnsDeviceName}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.customerDeviceName)}: </b>${customerDeviceName}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.connectivityStatus)}: </b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS[connectivityStatus as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS])}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.operationalStatus)}: </b>${i18n.t(TRANSLATION.SHARED.DATATABLE[operationalStatus as keyof typeof TRANSLATION.SHARED.DATATABLE])}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.model)}: </b>${model}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.streetAddress)}: </b>${streetAddress}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.TREEMENU.FILTER.city)}: </b>${city}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.state)}: </b>${state}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.zipCode)}: </b>${zipCode}</p>
    <p><b>${i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.country)}: </b>${country}</p>
    <p class="button-redirect-to-details" id="redirectToDetail">${!isDeviceGroup ? i18n.t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.moreInfo) : ""}</p></div>`;
  return response;
};
