const { spawn, execFile } = require('child_process');

const { Task } = require('jake');
const jest = require('jest');

async function runDefault() {
  await spawn('jake', ['-t'], { stdio: 'inherit' });
}

function handleLinter(error, stdout, _stderr) {
  if (error) {
    process.exitCode = error.code;
    console.log(stdout);
  } else {
    const format = process.stdout.isTTY ? '\x1b[32m%s\x1b[0m' : '%s';
    console.log(format, '✓');
  }
}

async function runTests(...parameters) {
  process.env.NODE_ENV = 'test';
  const args = [...parameters];
  args.unshift('--runInBand');

  await jest.run(args, './tests/');
  Task.closeServer.invoke();
}

async function runCoverageTests() {
  const options = ['-c', 'jest-coverage.js'];
  if (process.stdout.isTTY) options.push('--color');

  await spawn('node_modules/.bin/jest', options, {
    env: { NODE_ENV: 'test' },
    detached: false,
    cwd: '.',
    stdio: ['ignore', 'inherit', 'ignore'],
  });

  Task.closeServer.invoke();
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

async function runNodemon(...args) {
  const nodemon = 'node_modules/.bin/nodemon';

  await spawn(nodemon, [...args], {
    detached: false,
    cwd: '.',
    stdio: 'inherit',
  });
}

async function startServer() {
  global.nodeProcess = await spawn('node', ['.'], {
    env: { NODE_ENV: 'test' },
    detached: true,
    cwd: '.',
    stdio: 'ignore',
  });
}

function closeServer() {
  global.nodeProcess.kill();
}

module.exports = {
  runDefault,
  runTests,
  runCoverageTests,
  runLinter,
  runNodemon,
  startServer,
  closeServer,
};
