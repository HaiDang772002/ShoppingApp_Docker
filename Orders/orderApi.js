const express = require('express');
const orderModel = require('./orderModel')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/createOrder', async (req, res) => {
    try {
        const newOrder = req.body
        const data = await orderModel.create(newOrder)
        console.log(newOrder)
        if (data) {
            // Set data to Redis
            res.json(data);
        } else {
            res.json({ empty: 'Không thêm được dữ liệu' });
        }
    } catch (error) {
        res.json(error)
    }
})
app.get('/orders/:customerID', async (req, res) => {
    const orders = await orderModel.findAll({
        where: {
            Customers_CustomerID: req.params.customerID
        }
    })
    if (orders) {
        res.json(orders)
    }
    else {
        res.json({ empty: 'Không tìm thấy dữ liệu' })
    }
})
app.listen(3003, () => {
    console.log("Running on port 3003")
})