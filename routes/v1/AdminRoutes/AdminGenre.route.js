const express = require('express');
const router = express.Router();
const adminGenreController = require('../../../controlar/AdminController/AdminGenre.controller')


router.post('/add-genre', adminGenreController.addGenre );



module.exports = router;