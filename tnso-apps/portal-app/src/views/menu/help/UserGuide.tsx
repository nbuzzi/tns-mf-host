import React from 'react';
import { AuthHelper } from '../../../helpers/auth/AuthHelper';
import withAuthorization from '../../../HOC/withAuthorization';
import { TRANSLATION } from '../../../utils/const/translation';
import { useTranslation } from 'react-i18next';
import Text from 'i18n-module/i18nModule';

const UserGuideInternal: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="guide-container d-flex flex-column">
      <h5>
        <Text text={t(TRANSLATION.SIDEBAR.HELP.CONTACT.userGuideComingSoon)} />
      </h5>
    </div>
  );
};

const UserGuide = withAuthorization(
  UserGuideInternal,
  AuthHelper.getAllowedRolesForRoute('userGuide')
);

export default UserGuide;
