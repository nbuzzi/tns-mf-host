import React from "react";
import { observer } from "mobx-react";
import { TRANSLATION } from "../../../utils/const/translation";
import { DeviceDetail } from "../../../interfaces/devices/devices";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";

interface DeviceAddressCardProps {
    configurationData: DeviceDetail;
}

export const DeviceAddressCard: React.FC<DeviceAddressCardProps> = observer(({configurationData}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.streetAddress) + " 1"}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.streetAddress}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.streetAddress) + " 2"}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.streetAddress2}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.city)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.city}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.state)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.state}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.zipCode)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.zipCode}</Form.Label>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="gray-label col-5">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.country)}: </Form.Label>
        <Form.Label className="description col-7">{configurationData.country}</Form.Label>
      </Form.Group>
    </>
  );
});
