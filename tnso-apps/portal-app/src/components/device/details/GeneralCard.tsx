import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form } from 'react-bootstrap';
import { TNSOCard } from '@tnso/ui-components/dist';
import { observer } from 'mobx-react';

import { store } from '../../../store/StoreMobx';
import { DeviceDetail } from '../../../interfaces/devices/devices';
import { TRANSLATION } from '../../../utils/const/translation';
import { DeviceGeneralCard } from './DeviceGeneralCard';
import { DeviceAddressCard } from './DeviceAddressCard';

interface GeneralProps {
  configurationData?: DeviceDetail;
  isAddress: boolean;
}

export const GeneralCard: React.FC<GeneralProps> = observer(
  ({ configurationData, isAddress }): JSX.Element => {
    const { t } = useTranslation();
    const { userInfo } = store.auth;

    return (
      <TNSOCard className="w-100">
        <Card.Body>
          <div className="row">
            <div className="col">
              {configurationData && userInfo ? (
                <Form data-testid="general-form">
                  {!isAddress ? (
                    <DeviceGeneralCard
                      configurationData={configurationData}
                      userInfo={userInfo}
                    />
                  ) : (
                    <DeviceAddressCard configurationData={configurationData} />
                  )}
                </Form>
              ) : (
                <Form.Group>
                  <Form.Label className="gray-label">
                    {t(TRANSLATION.ERROR.noInformationAvailable)}
                  </Form.Label>
                </Form.Group>
              )}
            </div>
          </div>
        </Card.Body>
      </TNSOCard>
    );
  }
);
