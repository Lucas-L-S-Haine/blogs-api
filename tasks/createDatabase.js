const { sequelize, config } = require('./sequelize');

sequelize.queryInterface.createDatabase('blogs_api', config);
sequelize.queryInterface.createDatabase('blogs_api_test', config);
