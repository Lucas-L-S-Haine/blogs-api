require('dotenv/config');

const {
  MYSQL_USER: username,
  MYSQL_PASSWORD: password,
  MYSQL_HOST: host,
} = process.env;

module.exports = {
  development: {
    username,
    password,
    host,
    database: 'blogs_api',
    dialect: 'mysql',
  },
  test: {
    username,
    password,
    host,
    database: 'blogs_api',
    dialect: 'mysql',
  },
  production: {
    username,
    password,
    host,
    database: 'blogs_api',
    dialect: 'mysql',
  },
};
