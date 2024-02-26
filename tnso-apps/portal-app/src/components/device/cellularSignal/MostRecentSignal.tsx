import React, { useCallback, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { SignalComponent } from './SignalComponent';
import moment from 'moment';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from '../../../store/StoreMobx';
import { useParams } from 'react-router-dom';
import { useAsyncCall } from '../../../hooks/useAsyncCallShared';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

export const MostRecentSignal: React.FC = () => {
  const { deviceName } = useParams();
  const { cellularSignal } = store.device;
  const [isLoading, setLoading] = useState(false);

  const handleRefreshSignal = useCallback(async () => {
    if (deviceName) {
      setLoading(true);
      await cellularSignal.loadMostRecentSignal(deviceName);
      setLoading(false);
    }
  }, [deviceName]);

  useAsyncCall(async () => await handleRefreshSignal, []);

  return (
    <div
      className="d-flex justify-content-between align-items-center"
      data-testid="most-recent-signal"
    >
      <div className="d-flex flex-column justify-content-start">
        <Card.Title className="h6">
          <Text
            text={TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.subtitle}
          />
        </Card.Title>
        <p className="signal-date">
          {cellularSignal.mostRecentSignal?.dateTime
            ? moment(cellularSignal.mostRecentSignal?.dateTime)
                .tz(store.auth.userInfo?.timeZone ?? 'UTC')
                .format('lll')
            : moment()
                .tz(store.auth.userInfo?.timeZone ?? 'UTC')
                .format('lll')}
        </p>
        <small className="col-auto text-start">
          {cellularSignal.mostRecentSignal?.technologyType} -{' '}
          {cellularSignal.mostRecentSignal?.rssiSignalQuality ?? (
            <Text
              text={
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                  .noSignal
              }
            />
          )}
        </small>
      </div>
      <SignalComponent
        signalQuality={cellularSignal.mostRecentSignal?.rssiSignalQuality}
        width="100"
        height="100"
      />
      <div>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleRefreshSignal}
          disabled={isLoading}
          data-testid="most-recent-signal-button"
        >
          {!isLoading ? (
            <FontAwesomeIcon icon={faArrowRotateRight} size="lg" />
          ) : (
            <Spinner animation="border" size="sm" />
          )}
        </Button>
      </div>
    </div>
  );
};
