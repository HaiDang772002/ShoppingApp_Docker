const express = require('express');
const orderDetailModel = require('./orderDetailModel');
const { AsyncQueueError } = require('sequelize');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/createOrderDetail', async (req, res) => {
    try {
        const orderDetailArray = req.body
        const data = await orderDetailModel.bulkCreate(orderDetailArray);
        if (data) {
            res.json(data)
        }
        else {
            res.json({ empty: 'Không thêm được dữ liệu' });
        }
    } catch (error) {
        res.json(error)
    }
})
app.listen(3006, () => {
    console.log("Running on port 3006")
})