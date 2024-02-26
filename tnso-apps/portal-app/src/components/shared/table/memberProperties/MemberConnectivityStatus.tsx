import React, { useMemo } from 'react';
import { COLORS } from '../../../../utils/const/colors';
import { MemberConnectivityStatus } from '../../../../interfaces/memberConnectivity/memberConnectivity';
import { TRANSLATION } from '../../../../utils/const/translation';
import { memberConnectivityTranslation } from '../../../../interfaces/memberConnectivity/memberConnectivity';
import Text from 'i18n-module/i18nModule';
interface Props {
  status: MemberConnectivityStatus;
}

export const ComponentStatus: React.FC<Props> = ({ status }) => {
  const getStatusColor = (status: MemberConnectivityStatus): string => {
    switch (status) {
      case 'Up-Full Site-to-Site':
        return COLORS.TABLE.STATUS.UP_FULL_SITE_TO_SITE;
      case 'Up Site-to-Site':
        return COLORS.TABLE.STATUS.UP_SITE_TO_SITE;
      case 'Up TNS Network':
        return COLORS.TABLE.STATUS.UP_TNS_NETWORK;
      case 'Down':
        return COLORS.TABLE.STATUS.DOWN;
      default:
        return '';
    }
  };

  const statusColor = useMemo(() => getStatusColor(status), [status]);

  return (
    <div data-testid="member-connectivity-status">
      <div className="d-flex align-items-start">
        <p className="m-2">
          <Text
            text={
              TRANSLATION.SIDEBAR.MONITORING.MEMBERS.statusOfMemberConnection
            }
          />
          :{' '}
          <span className="status-text" style={{ color: statusColor }}>
            {memberConnectivityTranslation(status)}
          </span>
        </p>
      </div>
    </div>
  );
};
