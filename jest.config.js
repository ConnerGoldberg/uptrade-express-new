module.exports = {
  collectCoverage: true,
  roots: ['<rootDir>/server'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).+(ts|js)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  verbose: true,
  testTimeout: 30000,
};
