import { ModuleFederationConfig } from '@nx/webpack';
import { shared } from '../../module-federation.base.config';

const config: ModuleFederationConfig = {
  name: 'tnso-apps/user-guide',
  exposes: {
    './Module': './src/exposes-files/remote-entry.ts',
    './introduction/Module': './src/exposes-files/remote-introduction.ts',
    './lvc/Module': './src/exposes-files/remote-lvc.ts',
    './devices/Module': './src/exposes-files/remote-devices.ts',
    './details/Module': './src/exposes-files/remote-details.ts',
    './monitoring/Module': './src/exposes-files/remote-monitoring.ts',
  },
  shared,
};

export default config;
