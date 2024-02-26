/* eslint-disable */
export default {
  displayName: 'portal-app',
  testEnvironment: 'jest-environment-jsdom',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['@testing-library/react'],
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/tnso-apps/portal-app',
  moduleNameMapper: {
    'i18n-module/i18nModule': './jest-mocks/i18n-module.mock.ts',
    'i18n-module/i18n': './jest-mocks/i18n.mock.ts',
  },
};
