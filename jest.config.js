module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: [
    '/node_modules',
    '/android',
    '/ios',
    '/.expo',
    '/.expo-shared',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
  ],
};
