import { ModuleFederationConfig } from '@nx/webpack';
import {
  I18N_PORT_REMOTE,
  PORTAL_IP_REMOTE,
  shared,
} from '../../module-federation.base.config';

const config: ModuleFederationConfig = {
  name: 'tnso-apps/administration-app',

  exposes: {
    './ViewUserRoles': './src/exposes-files/user-roles/view-entry.ts',
    './CreateUserRoles': './src/exposes-files/user-roles/create-entry.ts',
    './EditUserRoles': './src/exposes-files/user-roles/edit-entry.ts',
  },
  remotes: [
    [
      'i18n-module',I18N_PORT_REMOTE,
    ],
  ],
  shared,
};

export default config;
