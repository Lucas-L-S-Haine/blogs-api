const {
  runTests,
  runCoverageTests,
  runLinter,
  runNodemon,
  runStart,
  startBGServer,
  closeBGServer,
} = require('./tasks/jakeActions');

const dbNamespace = require('./tasks/dbActions');

task('default', runStart);

desc('run tests with jest');
task('jest', ['startBGServer'], runTests);

desc('alias for "jest"');
task('test', ['startBGServer'], runTests);

desc('run coverage tests');
task('coverage', ['startBGServer'], runCoverageTests);

desc('run linter');
task('lint', runLinter);

desc('run application with nodemon');
task('dev', runNodemon);

desc('start server');
task('start', runStart);

task('startBGServer', startBGServer);
task('closeBGServer', closeBGServer);

namespace('db', dbNamespace);
