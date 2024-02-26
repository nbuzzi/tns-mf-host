import React from "react";
import { observer } from "mobx-react";
import { TRANSLATION } from "../../../utils/const/translation";
import { DeviceDetail } from "../../../interfaces/devices/devices";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { DateHelper } from "../../../helpers/shared/DateHelper";
import { UserInfo } from "../../../interfaces/auth/login/login";

interface DeviceGeneralCardProps {
  configurationData: DeviceDetail;
  userInfo: UserInfo
}

export const DeviceGeneralCard: React.FC<DeviceGeneralCardProps> = observer(({ configurationData, userInfo }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.acna)}: </Form.Label>
        <Form.Label className="description col-7">{`${configurationData.acna} - ${configurationData.knownAs}`}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.companyName)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.knownAs}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.tnsDeviceName)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.tnsDeviceName}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.customerDeviceName)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.customerDeviceName}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.connectivityStatus)}: </Form.Label>
        <Form.Label className="description col-7">
          {t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS[configurationData.connectivityStatus as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICESTATUS])}
        </Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.operationalStatus)}: </Form.Label>
        <Form.Label className="description col-7">{t(TRANSLATION.SHARED.DATATABLE[configurationData.operationalStatus as keyof typeof TRANSLATION.SHARED.DATATABLE])}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.manufacturer)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.manufacturer}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.model)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.model}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.statusLastChangedOn)}: </Form.Label>
        <Form.Label className="description col-7">{DateHelper.getDateFromTimestampWithTimeZone(configurationData.statusLastChangedOn, userInfo?.timeZone)}</Form.Label>
      </Form.Group>
    </>
  );
});
