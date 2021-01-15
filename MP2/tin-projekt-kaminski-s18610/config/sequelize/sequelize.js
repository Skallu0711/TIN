const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-example-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;