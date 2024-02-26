import React from 'react';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

export const SignalQuality: React.FC = () => {

  return (
    <div
      className="d-flex signals-container justify-content-center align-items-center border rounded py-4 gap-3"
      data-testid="signal-quality-component"
    >
      <span>
        <Text
          text={
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.CELLULARSIGNAL
              .qualitySignalMetric
          }
        />
        :{' '}
      </span>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="excellent-box" />
        <span>
          <Text
            text={
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                .excellent
            }
          />
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="good-box" />
        <span>
          <Text
            text={
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                .good
            }
          />
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="fair-box" />
        <span>
          <Text
            text={
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                .fair
            }
          />
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="poor-box" />
        <span>
          <Text
            text={
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                .poor
            }
          />
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="no-signal-box" />
        <span>
          <Text
            text={
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.SIGNALCARD
                .noSignal
            }
          />
        </span>
      </div>
    </div>
  );
};
