const express = require('express');
const router = express.Router();
const getUserId = require('../middlewares/getUserId');
const auth = require('../middlewares/auth');
const orderController = require('../controllers/order.controller');

router.get('/seats/:showId', orderController.getSeats);

router.post('', getUserId, orderController.addOrder);

router.patch('/:id', auth, orderController.editOrder);

router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;