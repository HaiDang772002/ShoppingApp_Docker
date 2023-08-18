const express = require('express');
const customerModel = require('./customerModel')
const app = express();
const redisTransaction = require('./manipulateRedisData')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/customerRegister/:id', async (req, res) => {
    const customerData = req.body
    const customerID = await customerModel.findOne({
        where: {
            CustomerID: req.params.id
        }
    })
    if (customerID) {
        await customerModel.update(customerData, {
            where: {
                CustomerID: req.params.id
            }
        })
    }
    else {
        await customerModel.create({ CustomerID: req.params.id, ...customerData })
    }
    res.status(200).send('Ok')
})
app.get('/customer/:id', async (req, res) => {
    const data = await customerModel.findOne({
        where: {
            CustomerID: req.params.id
        }
    });
    if (data) {
        // Set data to Redis
        res.json(data);
    } else {
        res.json({ empty: 'Không tìm thấy dữ liệu' });
    }
});
app.listen(3001, () => {
    console.log('Running on 3001')
})

