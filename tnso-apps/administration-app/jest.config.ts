/* eslint-disable */
export default {
  displayName: 'administration-app',
  preset: '../../jest.preset.js',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/tnso-apps/administration-app',
  moduleNameMapper: {
    'i18n-module/i18nModule': 'jest-mocks/i18n-module.mock.ts',
  },
};
