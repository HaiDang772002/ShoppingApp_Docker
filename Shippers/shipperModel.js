const { DataTypes } = require('sequelize');
const sequelize = require('./databases/initMysql'); // Make sure to use the correct path

const Shipper = sequelize.define('Shipper', {
    ShipperID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    ShipperName: {
        type: DataTypes.STRING
    },
    Phone: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'shippers',
    timestamps: false // Nếu bạn không muốn Sequelize tự động thêm timestamps
});

// Define associations here, if needed

module.exports = Shipper;