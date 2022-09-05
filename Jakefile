const { spawn } = require('child_process');

const { Task } = require('jake');
const jest = require('jest');

desc('default task');
task('default', async () => {
  await spawn('jake', ['-t'], { stdio: 'inherit' });
});

desc('run tests with jest');
task('jest', ['startServer'], runTests);

desc('alias for "jest"');
task('test', ['startServer'], runTests);

task('startServer', startServer);
task('closeServer', closeServer);

async function runTests(...parameters) {
  process.env.NODE_ENV = 'test';
  const arguments = [...parameters];

  await jest.run(arguments, './tests/');
  Task.closeServer.invoke();
}

async function startServer() {
  global.nodeProcess = await spawn('node', ['.'], {
    env: { NODE_ENV: 'test' },
    detached: true,
    cwd: __dirname,
    stdio: 'ignore',
  });
}

function closeServer() {
  global.nodeProcess.kill();
}
