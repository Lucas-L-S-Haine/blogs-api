const { spawn, execFile } = require('child_process');

const jake = require('jake');
const jest = require('jest');

const app = require('../src/app');

const { Task } = jake;
const port = process.env.PORT || 3000;

function handleLinter(error, stdout, _stderr) {
  if (error) {
    process.exitCode = error.code;
    console.log(stdout);
  } else {
    const format = process.stdout.isTTY ? '\x1b[32m%s\x1b[0m' : '%s';
    console.log(format, '✓');
  }
}

async function runTests(...args) {
  process.env.NODE_ENV = 'test';
  args.unshift('--runInBand');

  await jest.run(args, './tests/');
  Task.closeBGServer.invoke();
}

function runCoverageTests() {
  const options = ['-c', 'jest-coverage.js'];
  if (process.stdout.isTTY) options.push('--color');

  spawn('node_modules/.bin/jest', options, {
    env: { NODE_ENV: 'test' },
    detached: false,
    cwd: '.',
    stdio: ['ignore', 'inherit', 'ignore'],
  });

  Task.closeBGServer.invoke();
}

function runLinter() {
  const command = 'node_modules/.bin/eslint';
  const args = [
    '--no-inline-config',
    '--no-error-on-unmatched-pattern',
    '-c',
    '.eslintrc.json',
    '.',
  ];
  if (process.stdout.isTTY) args.unshift('--color');

  execFile(command, args, { encoding: 'utf-8' }, handleLinter);
}

function runNodemon(...args) {
  const nodemon = 'node_modules/.bin/nodemon';

  spawn(nodemon, [...args], {
    detached: false,
    cwd: '.',
    stdio: 'inherit',
  });
}

function runStart() {
  app.listen(port, () =>
    console.log(`Server listening on port \x1b[03;94m${port}\x1b[00m!`));
}

function startBGServer() {
  global.nodeProcess = spawn('node', ['.'], {
    env: { NODE_ENV: 'test' },
    detached: true,
    cwd: '.',
    stdio: 'ignore',
  });
}

function closeBGServer() {
  global.nodeProcess.kill();
}

module.exports = {
  runTests,
  runCoverageTests,
  runLinter,
  runNodemon,
  runStart,
  startBGServer,
  closeBGServer,
};
