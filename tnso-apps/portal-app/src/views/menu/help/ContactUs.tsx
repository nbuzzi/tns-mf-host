import React from 'react';
import { AuthHelper } from '../../../helpers/auth/AuthHelper';
import withAuthorization from '../../../HOC/withAuthorization';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

const ContactUsInternal: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-container d-flex flex-column">
      <div>
        <h5 className="title">
          <Text text={t(TRANSLATION.SHARED.contactUs)} />
        </h5>
        <div className="divider mb-4" />
        <h6>
          <Text
            text={t(
              TRANSLATION.SIDEBAR.HELP.CONTACT.globalNetworkOperationsCenter
            )}
          />
        </h6>
        <h6 className="text">
          <Text
            text={t(TRANSLATION.SIDEBAR.HELP.CONTACT.contactWhenReporting)}
          />
        </h6>
        <h6 className="email">
          <Text text={t(TRANSLATION.SHARED.email)} />:{' '}
          <a href="mailto:PSDNOC@tnsi.com">PSDNOC@tnsi.com</a>
        </h6>
        <h6 className="service">
          <Text
            text={t(TRANSLATION.SIDEBAR.HELP.CONTACT.clientManagementServices)}
          />
        </h6>
        <h6 className="text">
          <Text
            text={t(
              TRANSLATION.SIDEBAR.HELP.CONTACT.supportDuringRegularBusiness
            )}
          />
        </h6>
        <h6 className="email">
          <Text text={t(TRANSLATION.SHARED.email)} />:{' '}
          <a href="mailto:TNSOnlineCustomerSupport@tnsi.com">
            TNSOnlineCustomerSupport@tnsi.com
          </a>
        </h6>
      </div>
    </div>
  );
};

const ContactUs = withAuthorization(
  ContactUsInternal,
  AuthHelper.getAllowedRolesForRoute('contactUs')
);

export default ContactUs;
