const express = require('express');
const router = express.Router();
const getUserId = require('../middlewares/getUserId');
const orderController = require('../controllers/order.controller');

router.get('/seats/:showId', orderController.getSeats);

router.post('', getUserId, orderController.addOrder);

module.exports = router;