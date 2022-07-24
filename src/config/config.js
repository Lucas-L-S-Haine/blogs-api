require('dotenv/config');

const {
  MYSQL_USER: username,
  MYSQL_PASSWORD: password,
  MYSQL_HOST: host,
  MYSQL_PORT: port,
} = process.env;

module.exports = {
  development: {
    username,
    password,
    host,
    port,
    database: 'blogs_api',
    dialect: 'mysql',
  },
  test: {
    username,
    password,
    host,
    port,
    database: 'blogs_api_test',
    dialect: 'mysql',
  },
  production: {
    username,
    password,
    host,
    port,
    database: 'blogs_api',
    dialect: 'mysql',
  },
};
