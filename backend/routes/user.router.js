const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/data', userController.getUserData);

router.post('/data', userController.postUserData);

router.put('/data', userController.updateUserData);


module.exports = router;