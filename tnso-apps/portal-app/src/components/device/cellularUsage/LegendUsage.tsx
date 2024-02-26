import React from 'react';
import { LegendOptions } from './LegendOptions';
import { TRANSLATION } from '../../../utils/const/translation';

export const LegendUsage: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-center gap-3 w-100"
      data-testid="legend-usage-component"
    >
      <LegendOptions
        color="#0F2342"
        label={TRANSLATION.SHARED.TABLE.dataRemaining}
      />
      <LegendOptions
        color="#5388D8"
        label={TRANSLATION.SHARED.TABLE.totalReceivedBytes}
      />
      <LegendOptions
        color="#2A588D"
        label={TRANSLATION.SHARED.TABLE.totalTransmittedBytes}
      />
    </div>
  );
};
