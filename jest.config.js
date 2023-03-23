module.exports = {
  preset: 'ts-jest',
  // globals: {
  //   'ts-jest': {
  //     tsConfig: 'tsconfig.test.json',
  //   },
  // },
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  testMatch: ['<rootDir>/test/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/test/@.+/'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
};
