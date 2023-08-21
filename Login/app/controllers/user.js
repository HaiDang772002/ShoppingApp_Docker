const express = require('express')
const axios = require('axios')
const myLoginModel = require('../models/loginModel')
const { customerData } = require('./dataJsToEJS')
let CustomerInfoState //Biến lưu giữ trạng thái thông tin người dùng, có thể thay đổi theo thời gian
let ProductInfoState // Biến lưu giữ trạng thái mảng sản phẩm


function generateRandomID(number) {
    const randomOrderID = Math.floor(Math.random() * number); // Tạo số nguyên ngẫu nhiên từ 0 đến 999999
    return randomOrderID;
}
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
function getDate() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1; // Tháng bắt đầu từ 0 (0: Tháng 1)
    const year = new Date().getFullYear();

    // Định dạng thành chuỗi "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
}


const router = express.Router()
router.get('/userInfo', (req, res) => {
    res.render('userInfo', { title: 'UserInfo' })
})


//Customer
router.get('/customer', async (req, res) => {
    try {
        const customerID = req.session.userID
        const response = await axios.get(`${process.env.CUSTOMER_HOST}/customer/${customerID}`);
        const responseData = response.data; // Use response.data to access the parsed JSON data
        if (responseData.empty) {
            res.render('customerInfoRegister', { title: 'User', customer: customerData })
        }
        else {
            const { CustomerID, ...customerData } = responseData
            CustomerInfoState = customerData;
            res.render('customerInfo', { title: 'User', customer: customerData })
        }
    }
    catch (error) {
        console.log(error)
    }
}
);
router.post('/customerRegister', async (req, res) => {
    const customerData = req.body;
    await axios.post(`${process.env.CUSTOMER_HOST}/customerRegister/${req.session.userID}`, customerData)
    CustomerInfoState = customerData
    res.render('customerInfo', { title: 'User', customer: customerData })
})

router.get('/customerChangeInfo', (req, res) => {
    res.render('customerInfoRegister', { title: 'User', customer: CustomerInfoState })
})


//Shipper
router.get('/shipper', (req, res) => {
})



//Product
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.PRODUCT_HOST}/products`)
        const products = response.data
        res.render('index', { title: 'Management', products: products })
    } catch (error) {
        res.json('You haven\'t turn on Product Service')
    }
})
router.get('/products/:id', async (req, res) => {
    const response = await axios.get(`${process.env.PRODUCT_HOST}/products/${req.params.id}`)
    const responseData = response.data
    if (responseData.empty) {
        res.send('Không tìm thấy Product Trong cơ sở dữ liệu')
    }
    else {
        res.render('productPurchase', { title: 'productPurchase', product: responseData })
    }
})




//Cart
router.get('/cart', async (req, res) => {
    res.render('cart', { title: 'Cart', products: req.session.cart })
})

router.post('/cart', async (req, res) => {
    const newProduct = req.body;
    const existingProductIndex = req.session.cart.findIndex(product => product.ProductID === newProduct.ProductID);
    if (existingProductIndex !== -1) {
        // Product already exists in the cart, increase quantity
        let quantity = parseInt(req.session.cart[existingProductIndex].quantity) + parseInt(newProduct.quantity)
        req.session.cart[existingProductIndex].quantity = quantity.toString()
    } else {
        // Product does not exist in the cart, add it
        req.session.cart.unshift(newProduct);
    }
    console.log(req.session.cart)
    res.redirect('/users/cart');
});
router.delete('/cart/:productId', async (req, res) => {
    const productId = req.params.productId;
    const productIndex = req.session.cart.findIndex(item => item.ProductID === productId);
    if (productIndex !== -1) {
        req.session.cart.splice(productIndex, 1);
        console.log(req.session.cart)
    }
    res.sendStatus(204); // Gửi trạng thái 204 No Content
});
router.post('/submit-order', async (req, res, next) => {
    const response = await axios.get(`${process.env.CUSTOMER_HOST}/customer/${req.session.userID}`);
    const responseData = response.data; // Use response.data to access the parsed JSON data
    if (responseData.empty) {
        res.redirect('/users/customer')
    }
    else {
        next();
    }
}, async (req, res) => {
    const { productIdList, quantityList } = req.body
    let item;
    let orderDetailList = []
    const responseShipperIDList = await axios.get(`${process.env.SHIPPER_HOST}/getAllShipperID`)
    const shipperIDList = responseShipperIDList.data
    const shipperChose = getRandomElement(shipperIDList)
    const responseEmployeeIDList = await axios.get(`${process.env.EMPLOYEE_HOST}/getAllEmployeeID`)
    const employeeIDList = responseEmployeeIDList.data;
    const employeeChose = getRandomElement(employeeIDList)

    //create Order
    const order = {
        OrderID: generateRandomID(1000000),
        OrderDate: getDate(),
        Customers_CustomerID: req.session.userID,
        Employees_EmployeeID: employeeChose,
        Shippers_ShipperID: shipperChose
    }
    //create OrderDetails
    for (let i = 0; i < productIdList.length; i++) {
        item = {
            OrderDetailID: generateRandomID(5000000),
            Orders_OrderID: order.OrderID,
            Quantity: quantityList[i],
            Orders_Customers_CustomerID: order.Customers_CustomerID,
            Products_ProductID: productIdList[i],
        }
        orderDetailList.push(item)
    }
    console.log(orderDetailList)
    const orderResponse = await axios.post(`${process.env.ORDER_HOST}/createOrder/`, order)
    if (orderResponse.data.empty) {
        res.json("Error create order")
    }
    else {
        const responseOrderDetails = await axios.post(`${process.env.ORDERDETAIL_HOST}/createOrderDetail/`, orderDetailList)
        if (responseOrderDetails.data.empty) {
            res.json('Failed')
        }
        else {
            // Xóa hết dữ liệu trong mảng req.session.cart bằng cách sử dụng splice
            req.session.cart.splice(0, req.session.cart.length);
            res.redirect('/users/orders')
        }
    }
})

//order
router.get('/orders', async (req, res) => {
    const allOrders = await axios.get(`${process.env.ORDER_HOST}/orders/${req.session.userID}`)
    if (allOrders.data.empty) {
        res.json("Không tìm thấy dữ liệu ")
    }
    else {
        const allOrdersArray = allOrders.data
        const allOrderDetailsArray = []
        const priceForEach = []
        const orderPrice = []
        for (let i = 0; i < allOrdersArray.length; i++) {
            let totalOrderPrice = 0;
            const orderDetailsForEachOrderResult = await axios.get(`${process.env.ORDERDETAIL_HOST}/allOrderDetails/ProductID_and_Quantity/${allOrdersArray[i].OrderID}`)
            const orderDetailsForEachOrder = orderDetailsForEachOrderResult.data;
            for (let j = 0; j < orderDetailsForEachOrder.length; j++) {
                const priceforEachProduct = await axios.get(`${process.env.PRODUCT_HOST}/products/Price/${orderDetailsForEachOrder[j].Products_ProductID}`)
                orderDetailsForEachOrder[j].Price = priceforEachProduct.data.Price * orderDetailsForEachOrder[j].Quantity
                totalOrderPrice += orderDetailsForEachOrder[j].Price
            }
            orderPrice[i] = totalOrderPrice
            console.log(orderPrice)
            allOrderDetailsArray.push(orderDetailsForEachOrder)
        }
        console.log(allOrderDetailsArray)
        res.render('allOrders', { title: 'allOrders', orders: allOrdersArray, orderDetails: allOrderDetailsArray, orderPrice: orderPrice })
    }
})
router.delete('/order/:orderID', async (req, res) => {
    axios.delete(`${process.env.ORDER_HOST}/order/${req.params.orderID}`)
        .then(response => {
            console.log('Đã xóa đơn hàng thành công:', response.data);
            // Xử lý phản hồi khi yêu cầu DELETE thành công
        })
        .catch(error => {
            console.error('Lỗi xóa đơn hàng:', error);
            // Xử lý lỗi nếu có lỗi
        });
    res.sendStatus(204); // Gửi trạng thái 204 No Content
});
module.exports = router;