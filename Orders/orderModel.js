const { DataTypes } = require('sequelize');
const sequelize = require('./databases/initMysql'); // Make sure to use the correct path

const orderModel = sequelize.define('Order', {
    OrderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    OrderDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Customers_CustomerID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Employees_EmployeeID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Shippers_ShipperID: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});
module.exports = orderModel;