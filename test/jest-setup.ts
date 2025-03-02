import '@testing-library/jest-dom';

// Mock console methods to keep test output clean
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Mock import.meta.glob since it's a Vite-specific feature
global.import = { meta: { glob: jest.fn() } };