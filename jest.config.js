export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/test/**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  
  // Mock any file imports
  moduleNameMapper: {
    // Mock static assets
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
    
    // Mock CSS imports
    "\\.(css|less)$": "<rootDir>/test/__mocks__/styleMock.js",
  },
  
  // Mock transformations for our utility modules with import.meta.glob
  transformIgnorePatterns: [
    '/node_modules/'
  ],

  // Explicitly mock the blog and project loader modules 
  modulePathIgnorePatterns: [],
};