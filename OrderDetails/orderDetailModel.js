const { DataTypes } = require('sequelize');
const sequelize = require('./databases/initMysql'); // Make sure to use the correct path

const OrderDetails = sequelize.define('OrderDetail', {
    OrderDetailID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Quantity: {
        type: DataTypes.INTEGER
    },
    Orders_OrderID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Orders_Customers_CustomerID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Products_ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'orderdetails',
    timestamps: false // If you don't want Sequelize to automatically handle timestamps
});

// Define associations here, if needed

module.exports = OrderDetails;