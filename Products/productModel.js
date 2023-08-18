const { DataTypes } = require('sequelize');
const sequelize = require('./databases/initMysql'); // Make sure to use the correct path

const productModel = sequelize.define('Product', {
    ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    ProductName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    Unit: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    Suppliers_SupplierID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'suppliers',
            key: 'SupplierID',
        },
    },
    Categories_CategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'CategoryID',
        },
    },
}, {
    tableName: 'products',
    timestamps: false,
});

module.exports = productModel;
