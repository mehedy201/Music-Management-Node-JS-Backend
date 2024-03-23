const express = require('express');
const router = express.Router();
const adminArtistController = require('../../../controlar/AdminController/AdminArtist.controller')

router.get('/', adminArtistController.usersArtistList);
router.get('/search-artist', adminArtistController.artistListBySearch);

module.exports = router;