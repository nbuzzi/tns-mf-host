import { ModuleFederationConfig } from '@nx/webpack';
import {
  PORTAL_IP_REMOTE,
  PORTAL_PORT_REMOTE,
  ADMINISTRATION_PORT_REMOTE,
  shared,
  I18N_PORT_REMOTE,
} from '../module-federation.base.config';

const config: ModuleFederationConfig = {
  name: 'main-host-app',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: [
    [
      'tnso-apps/portal-app',
      PORTAL_PORT_REMOTE,
    ],
    [
      'tnso-apps/administration-app',ADMINISTRATION_PORT_REMOTE,
    ],
    [
      'i18n-module',I18N_PORT_REMOTE,
    ],
  ],
  shared,
};

export default config;
