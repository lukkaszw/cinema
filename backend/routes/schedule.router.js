const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

router.get('', scheduleController.getSchedule);

module.exports = router;