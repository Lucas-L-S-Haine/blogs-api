const {
  runDefault,
  runTests,
  runCoverageTests,
  runLinter,
  runNodemon,
  startServer,
  closeServer,
} = require('./tasks/jakeActions');

desc('list tasks');
task('default', runDefault);

desc('run tests with jest');
task('jest', ['startServer'], runTests);

desc('alias for "jest"');
task('test', ['startServer'], runTests);

desc('run coverage tests');
task('coverage', ['startServer'], runCoverageTests);

desc('run linter');
task('lint', runLinter);

desc('run application with nodemon');
task('dev', runNodemon);

task('startServer', startServer);
task('closeServer', closeServer);
