const { DataTypes } = require('sequelize');
const sequelize = require('./databases/initMysql'); // Make sure to use the correct path

const Employee = sequelize.define('Employee', {
    EmployeeID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    LastName: {
        type: DataTypes.STRING
    },
    FirstName: {
        type: DataTypes.STRING
    },
    BirthDate: {
        type: DataTypes.STRING
    },
    Photo: {
        type: DataTypes.STRING
    },
    Notes: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'employees',
    timestamps: false // Nếu bạn không muốn Sequelize tự động thêm timestamps
});

// Define associations here, if needed

module.exports = Employee;
