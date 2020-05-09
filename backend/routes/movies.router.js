const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');

router.get('', moviesController.getAll);

router.get('/:id', moviesController.getOne);

router.post('', moviesController.createOne);

module.exports = router;