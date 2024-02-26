import { ModuleFederationConfig } from '@nx/webpack';
import {
  I18N_PORT_REMOTE,
  PORTAL_IP_REMOTE,
  PORTAL_PORT_REMOTE,
  shared,
} from '../../module-federation.base.config';

const config: ModuleFederationConfig = {
  name: 'tnso-apps/portal-app',
  exposes: {
    './LoginSection': './src/exposes-files/login-entry.ts',
    './Module': './src/exposes-files/remote-entry.ts',
    './DevicesSection': './src/exposes-files/device-entry.ts',
    './DeviceDetailSection': './src/exposes-files/device-detail-entry.ts',
    './MembersSection': './src/exposes-files/members-entry.ts',
    './UserAdministrationSection':
      './src/exposes-files/user-administration-entry.ts',
    './CompanyAdministrationSection':
      './src/exposes-files/company-profile-name-entry.ts',
    './ForgotPassword': './src/exposes-files/forgot-password-entry.ts',
  },
  remotes: [
    [
      'i18n-module', I18N_PORT_REMOTE,
    ],
  ],
  shared,
};

export default config;
