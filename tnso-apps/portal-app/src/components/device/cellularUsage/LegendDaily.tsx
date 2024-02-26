import React from 'react';
import { LegendOptions } from './LegendOptions';
import { TRANSLATION } from '../../../utils/const/translation';

interface Props {
  isClosedPeriod?: boolean;
}
export const LegendDaily: React.FC<Props> = ({ isClosedPeriod }) => {
  return (
    <div className="d-flex gap-4 w-100" data-testid="legend-daily-component">
      <LegendOptions
        color="#2C579E"
        label={TRANSLATION.SHARED.TABLE.consumed}
        width="30px"
      />
      <LegendOptions
        color="#FF2D2E"
        label={TRANSLATION.SHARED.TABLE.overage}
        width="30px"
      />
      {!isClosedPeriod && (
        <>
          <LegendOptions
            color="#F8E00D"
            label={TRANSLATION.SHARED.TABLE.predicted}
            width="30px"
          />
          <LegendOptions
            color="#FA7130"
            label={TRANSLATION.SHARED.TABLE.predictedOverage}
            width="30px"
          />
        </>
      )}
    </div>
  );
};
