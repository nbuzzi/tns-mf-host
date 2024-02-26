import React from 'react';
import { TRANSLATION } from '../../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

interface Props {
  acna: string;
  knownAs: string;
}
export const ComponentKnownAs: React.FC<Props> = ({ acna, knownAs }) => {

  return (
    <div data-testid="member-known-as">
      <div className="d-flex align-items-start">
        <p className="m-2">
          <Text text={TRANSLATION.SIDEBAR.MONITORING.MEMBERS.partner} />:{' '}
          <strong className="status-text">{acna + ' - ' + knownAs}</strong>
        </p>
      </div>
    </div>
  );
};
