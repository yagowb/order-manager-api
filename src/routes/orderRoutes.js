const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');




router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrderById)

router.get('/list', orderController.getAllOrders);

router.put('/:id', orderController.updateOrderByID);

router.delete('/:id', orderController.deleteOrderById);


module.exports = router;