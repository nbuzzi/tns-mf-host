import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLockedPng from '../../../assets/images/error/UserLocked.png';
import { TRANSLATION } from '../../../utils/const/translation';
import { store } from '../../../store/StoreMobx';
import { useAsyncCall } from '../../../hooks/useAsyncCall';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

const UserLocked: React.FC = () => {
  const navigate = useNavigate();
  const { shared } = store;

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const defaultLanguage = useCallback(async () => {
    await i18n.changeLanguage(shared.currentLanguage);
  }, [shared.currentLanguage]);

  useAsyncCall(defaultLanguage, []);

  return (
    <div className="locked-container d-flex flex-column justify-content-center align-items-center">
      <h5 className="mt-5 mb-5 title">
        {' '}
        <Text text={TRANSLATION.ERROR.thisaccounthasbeenlocked} />
      </h5>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={UserLockedPng} alt="" aria-hidden="true" />
      </div>
      <h6 className="mt-5 text flex-column">
        <Text text={TRANSLATION.SIDEBAR.HELP.CONTACT.contactWhenReporting} />
      </h6>
      <h6 className="text flex-column">
        <Text text={TRANSLATION.SIDEBAR.HELP.CONTACT.organizationsContact} />
      </h6>
      <a href="mailto:TNSOnlineCustomerSupport@tnsi.com">
        TNSOnlineCustomerSupport@tnsi.com
      </a>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <TNSOButton variant={Variants.OutlinePrimary} onClick={goBack}>
          <Text text={TRANSLATION.SHARED.goBack} />
        </TNSOButton>
      </div>
    </div>
  );
};

export default UserLocked;
