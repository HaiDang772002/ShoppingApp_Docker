const express = require('express');
const employeeModel = require('./employeeModel');
const Employee = require('./employeeModel');
const Shipper = require('../Shippers/shipperModel');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/getAllEmployeeID', async (req, res) => {
    const employeeIDList = await employeeModel.findAll({
        attributes: ['EmployeeID']
    });
    if (employeeIDList) {
        res.json(employeeIDList.map(employee => employee.EmployeeID))
    }
    else {
        res.json({ empty: 'Không tìm thấy dữ liệu' });
    }
})
app.listen(3004, () => {
    console.log("Running on port 3004")
})