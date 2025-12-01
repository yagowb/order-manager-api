const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');




router.post('/order', orderController.createOrder);

router.get('/order/:id', orderController.getOrderById)

router.get('/order/list', orderController.getAllOrders);

router.put('/order/:id', orderController.updateOrderByID);

router.delete('/order/:id', orderController.deleteOrderById);


module.exports = router;