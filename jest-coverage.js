module.exports = {
  testFailureExitCode: 0,
  silent: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/*/**/index.js'],
  coveragePathIgnorePatterns: [
    'src/models/',
    'src/migrations/',
    'src/seeders/',
    'src/config/',
  ],
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js',
    '<rootDir>/tests/integration/**/*.spec.js',
  ],
};
