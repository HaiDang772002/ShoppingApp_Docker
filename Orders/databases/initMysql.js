const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'mysql-container',
    dialect: 'mysql',
    database: 'mydb'
});
module.exports = sequelize;
