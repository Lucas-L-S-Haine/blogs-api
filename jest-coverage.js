module.exports = {
  testFailureExitCode: 0,
  silent: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'src/models/',
    'src/migrations/',
    'src/seeders/',
  ],
};
