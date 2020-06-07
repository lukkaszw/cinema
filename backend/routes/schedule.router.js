const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

router.get('', scheduleController.getSchedule);

router.get('/:id', scheduleController.getOneSchedule);

module.exports = router;