import React, { useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import unauthorizedPng from '../../../assets/images/error/Unauthorized.png';
import './Errors.scss';
import { TRANSLATION } from '../../../utils/const/translation';
import { useAsyncCall } from '../../../hooks/useAsyncCall';
import { store } from '../../../store/StoreMobx';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

const Unauthorized: React.FC = () => {
  const { shared } = store;

  const defaultLanguage = useCallback(async () => {
    await i18n.changeLanguage(shared.currentLanguage);
  }, [shared.currentLanguage]);

  useAsyncCall(defaultLanguage, []);
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center gap-2 container">
      <img src={unauthorizedPng} alt="401" className="img-fluid" />
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 container-text">
        <Link to="auth/login" className="text-decoration-none text-white">
          <TNSOButton variant={Variants.Link}>
            <Text text={TRANSLATION.SHARED.goTo} />
          </TNSOButton>
        </Link>
      </div>
    </Container>
  );
};

export default Unauthorized;
