export default {
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['<rootDir>/test/**/*.test.(ts|tsx)'],
  };