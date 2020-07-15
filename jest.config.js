module.exports = {
  testEnvironment: 'node',
  automock: false,
  clearMocks: true,
  moduleFileExtensions: ['js'],
  setupFiles: [
    './jest.setup.js',
  ],
  setupFilesAfterEnv: ['jest-extended'],
  testMatch: ['**/src/**/__tests__/**/*.[jt]s?(x)'],
  testTimeout: 10000,
};
