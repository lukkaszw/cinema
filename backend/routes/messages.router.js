const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller');

router.post('', messagesController.validateMessage, messagesController.createOne);

module.exports = router;