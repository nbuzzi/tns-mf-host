import React, { useCallback, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthHelper } from '../../../helpers/auth/AuthHelper';

import notFoundPng from '../../../assets/images/error/NotFound.png';
import './Errors.scss';
import { Roles } from '../../../interfaces/auth/roleAndPermission/role';

import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../../src/utils/const/translation';
import { useAsyncCall } from '../../../hooks/useAsyncCall';
import { store } from '../../../store/StoreMobx';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

const NotFound: React.FC = () => {
  const [textButton, setTextButton] = React.useState<string>('Dashboard');
  const [urlRedirect, setUrlRedirect] = React.useState<string>(
    '/monitoring/devices'
  );
  const { t } = useTranslation();
  const { shared } = store;

  const defaultLanguage = useCallback(async () => {
    await i18n.changeLanguage(shared.currentLanguage);
  }, [shared.currentLanguage]);

  useAsyncCall(defaultLanguage, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const { role } = AuthHelper.getAuthByToken(token);
      if (role === Roles.SuperUser) {
        setTextButton(
          i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.administrationPanel)
        );
        setUrlRedirect('/administration/company');
      } else {
        setTextButton(t(TRANSLATION.SIDEBAR.MONITORING.dashboard));
        setUrlRedirect('/monitoring/devices');
      }
    }
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center gap-2 container">
      <img src={notFoundPng} alt="403" className="img-fluid" />
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 container-text-404">
        <h2 className="subtitle">
          <Text text={TRANSLATION.ERROR.pageNotFound} />
        </h2>
        <p>
          <Text text={TRANSLATION.ERROR.weLookedEverywhereForThisPage} />
        </p>
        <p>
          <Text text={TRANSLATION.ERROR.areYouSureTheWebsiteURLIsCorrect} />
        </p>
        <p>
          <Text text={TRANSLATION.ERROR.getInTouchWithTheSiteOwner} />
        </p>
        <Link to={urlRedirect} className="text-decoration-none text-white">
          <TNSOButton variant={Variants.Link}>
            <Text text={TRANSLATION.SHARED.goTo} />
            {textButton}
          </TNSOButton>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
