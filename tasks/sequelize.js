require('dotenv/config');
const { Sequelize } = require('sequelize');

const {
  MYSQL_USER: username,
  MYSQL_PASSWORD: password,
  MYSQL_HOST,
  MYSQL_PORT,
} = process.env;
const host = MYSQL_HOST || 'localhost';
const port = MYSQL_PORT || '3306';
const dialect = 'mysql';

if (!username) {
  console.error('Error: cannot read environment variables');
  process.exit(1);
}

const config = {
  username,
  password,
  host,
  port,
  dialect,
};

const sequelize = new Sequelize(config);

module.exports = {
  sequelize,
  Sequelize,
  config,
};
