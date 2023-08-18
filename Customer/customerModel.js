// models/Customer.js

const { DataTypes } = require('sequelize');
const sequelize = require('./databases/initMysql'); // Đảm bảo đúng đường dẫn

const customerModel = sequelize.define('Customer', {
    CustomerID: {
        type: DataTypes.STRING(45),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
    },
    CustomerName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    ContactName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    Address: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    City: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    PostalCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    Country: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'customers',
    timestamps: false,
});

module.exports = customerModel;
