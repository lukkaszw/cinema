const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');

router.patch('/:id', newsController.updateNewsAsRead);

module.exports = router;