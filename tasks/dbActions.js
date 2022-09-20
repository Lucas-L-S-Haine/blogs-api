const { execFileSync } = require('child_process');
const { task, desc } = require('jake');

const sequelizeCLI = 'node_modules/.bin/sequelize-cli';

function execute(args) {
  try {
    const stdout = execFileSync(sequelizeCLI, args, { encoding: 'utf-8' });
    console.log(stdout);
  } catch (err) {
    process.exitCode = err.status;
  }
}

function dbDrop(env = 'development') {
  const { env: processEnv, NODE_ENV } = process.env;
  const environment = processEnv || NODE_ENV || env;

  const args = ['db:drop', '--env', environment];

  execute(args);
}

function dbSeed(env = 'development') {
  const { env: processEnv, NODE_ENV } = process.env;
  const environment = processEnv || NODE_ENV || env;

  const args = ['db:seed:all', '--env', environment];

  execute(args);
}

function dbCreate(env = 'development') {
  const { env: processEnv, NODE_ENV } = process.env;
  const environment = processEnv || NODE_ENV || env;

  const args = ['db:create', '--env', environment];

  execute(args);
}

function dbMigrate(env = 'development') {
  const { env: processEnv, NODE_ENV } = process.env;
  const environment = processEnv || NODE_ENV || env;

  const args = ['db:migrate', '--env', environment];

  execute(args);
}

function dbNamespace() {
  desc('create database');
  task('create', dbCreate);

  desc('create sql tables');
  task('migrate', ['create'], dbMigrate);

  desc('populate database');
  task('seed', ['create', 'migrate'], dbSeed);

  desc('drop database');
  task('drop', dbDrop);
}

module.exports = dbNamespace;
