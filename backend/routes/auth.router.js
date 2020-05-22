const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.post('/register',  authController.signup);

router.post('/login', authController.signin);

router.post('/logout', auth, authController.logout);

router.post('/logoutall', auth, authController.logoutAll);

module.exports = router;