import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Form } from "react-bootstrap";
import { DeviceLAN } from "../../../interfaces/devices/configuration/configuration";
import { TRANSLATION } from "../../../../src/utils/const/translation";

export interface LANProps {
  LANData?: DeviceLAN;
}

export const LANCard: React.FC<LANProps> = ({ LANData }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card className="software-card w-100 h-100" data-testid="lan-card">
      <Card.Body>
        <div className="row">
          <div className="col">
            <Card.Title className="title">{t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.LAN.lan)}</Card.Title>
          </div>
        </div>
        <br />
        <div className="row">
          {LANData ? (
            Object.keys(LANData).map((key) => {
              const keyOf = key as keyof typeof LANData;
              return (
                <Form.Group key={key} className="row" data-testid="lan-form">
                  <Form.Label className="gray-label col-6">
                    {t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.LAN[key.replace(" ", "") as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.LAN])}:{" "}
                  </Form.Label>
                  <Form.Label className="description col-6">{LANData[keyOf]}</Form.Label>
                </Form.Group>
              );
            })
          ) : (
            <Form.Group>
              <Form.Label className="gray-label" data-testid="error-message-lan-card">
                {t(TRANSLATION.ERROR.noInformationAvailable)}
              </Form.Label>
            </Form.Group>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
