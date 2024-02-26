import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'i18n-module',

  exposes: {
    './i18nModule': './src/remote-entry.ts',
    './i18n': './src/i18n-entry.ts',
  },
};

export default config;
