const { spawn, execFile } = require('child_process');

const jake = require('jake');
const jest = require('jest');
const { green, grey } = require('chalk');

const { Task } = jake;

function getFunctionParameters(action) {
  let result = '';
  const parameters = action.toString().split('(').at(1).split(')')[0];

  if (parameters !== '') result += `[${parameters}]`;
  return result;
}

function addTaskToList(leftSide, rightSide, stringSizes, parameters) {
  const [line, label, size] = parameters;
  leftSide.push(line);
  rightSide.push(label);
  stringSizes.push(size);
}

function printResultingTaskList(leftSide, rightSide, stringSizes, maximumStringSize) {
  for (let index = 0; index < leftSide.length; index += 1) {
    let result = leftSide[index];
    const spaces = maximumStringSize - stringSizes[index] + 1;
    result += Array(spaces).fill(' ').join('');
    result += rightSide[index];

    console.log(result);
  }
}

function listTasks() {
  const leftSide = [];
  const rightSide = [];
  const stringSizes = [];
  let maximumStringSize = 0;
  const { tasks } = jake.currentNamespace;

  for (let index = 0, keys = Object.keys(tasks); index < keys.length; index += 1) {
    const key = keys[index];
    if (tasks[key].description != null) {
      const { name, description, action } = tasks[key];
      const parameters = getFunctionParameters(action);

      const line = `jake ${green(name)}${parameters}`;
      const label = `${grey('#')} ${grey(description)}`;
      const size = line.length;

      addTaskToList(leftSide, rightSide, stringSizes, [line, label, size]);
      maximumStringSize = Math.max(maximumStringSize, size);
    }
  }

  printResultingTaskList(leftSide, rightSide, stringSizes, maximumStringSize);
}

function runDefault() {
  listTasks();
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
