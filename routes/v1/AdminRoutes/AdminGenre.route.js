const express = require('express');
const router = express.Router();
const adminGenreController = require('../../../controlar/AdminController/AdminGenre.controller')


router.post('/add-genre', adminGenreController.addGenre );
router.get('/', adminGenreController.getAllGenre );
router.delete('/:id', adminGenreController.deleteGenre );



module.exports = router;