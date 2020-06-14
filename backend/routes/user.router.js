const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/data', userController.getUserData);

router.put('/data', userController.updateUserData);

router.patch('/p', userController.updatePassword);

router.delete('/me', userController.deleteAccount);

module.exports = router;