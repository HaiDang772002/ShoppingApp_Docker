const express = require('express');
const productModel = require('./productModel')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    const products = await productModel.findAll();
    res.json(products)
})

app.get('/products/:id', async (req, res) => {
    const data = await productModel.findOne({
        where: {
            ProductID: req.params.id
        }
    });
    if (data) {
        // Set data to Redis
        res.json(data);
    } else {
        res.json({ empty: 'Không tìm thấy dữ liệu' });
    }
})
app.listen(3002, () => {
    console.log('Running on port 3002')
})