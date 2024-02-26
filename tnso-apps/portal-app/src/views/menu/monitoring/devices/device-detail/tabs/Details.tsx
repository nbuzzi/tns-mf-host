import React, { useCallback } from 'react';
import { LANCard } from '../../../../../../components/device/details/LANCard';
import { GeneralCard } from '../../../../../../components/device/details/GeneralCard';
import { DeviceLocationMap } from '../../../../../../components/device/details/DeviceLocation';
import { useAsyncCall } from '../../../../../../hooks/useAsyncCall';
import { LAN_ENABLE } from './../../../../../../config/environments';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../../../../utils/const/translation';

import { store } from '../../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';

export const Details: React.FC = observer(() => {
  const { deviceName } = useParams();
  const navigate = useNavigate();
  const { detail } = store.device;
  const { t } = useTranslation();

  const loadData = useCallback(
    async (): Promise<void> => await detail.loadData(deviceName),
    [deviceName]
  );

  const handleOnClick = useCallback((): void => {
    navigate(
      `/monitoring/devices/device-detail/${deviceName}/device-address-change/edit`
    );
  }, [navigate, deviceName]);

  useAsyncCall(loadData, []);

  return (
    <Container fluid>
      <Row>
        <Col lg={6} className="mb-4">
          <DeviceLocationMap />
        </Col>
        <Col lg={6}>
          <div className="row">
            <div className="col">
              <p className="m-2">
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION
                      .general
                  )}
                />
              </p>
            </div>
          </div>
          <GeneralCard configurationData={detail.data} isAddress={false} />
          <div className="row">
            <div className=" d-flex justify-content-end align-content-end mt-3">
              <TNSOButton variant={Variants.Primary} onClick={handleOnClick}>
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION
                      .changeAddress
                  )}
                />
              </TNSOButton>
            </div>
            <div className="col">
              <p className="">
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION
                      .siteAddress
                  )}
                />
              </p>
            </div>
          </div>
          <GeneralCard configurationData={detail.data} isAddress={true} />
          {LAN_ENABLE && (
            <Col lg={6} className="mb-4">
              {detail.data && (
                <LANCard
                  LANData={{
                    lanIpAddress: detail.data?.lanIpAddress,
                    lanSubnetMask: detail.data?.lanSubnetMask,
                  }}
                />
              )}
            </Col>
          )}
        </Col>
      </Row>
    </Container>
  );
});
