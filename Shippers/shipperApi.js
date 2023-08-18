const express = require('express');
const shipperModel = require('./shipperModel')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/getAllShipperID', async (req, res) => {
    const shipperIDList = await shipperModel.findAll({
        attributes: ['ShipperID']
    });
    if (shipperIDList) {
        res.json(shipperIDList.map(shipper => shipper.ShipperID))
    }
    else {
        res.json({ empty: 'Không tìm thấy dữ liệu' });
    }
})
app.listen(3005, () => {
    console.log('Running on port 3005')
})