const express = require('express');
const artistController = require('../../controlar/artist.controller');
const router = express.Router();

// Create a new user using Email______________________________
router.get('/:id', artistController.userArtistList);

module.exports = router;