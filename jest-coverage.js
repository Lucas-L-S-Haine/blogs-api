module.exports = {
  testFailureExitCode: 0,
  silent: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/*/**/index.js'],
  coveragePathIgnorePatterns: [
    'src/models/',
    'src/migrations/',
    'src/seeders/',
  ],
};
