const express = require('express');
const artistController = require('../../controlar/artist.controller');
const router = express.Router();

// Get All Artist in Specific Muster Usere____________________________________
router.get('/:id', artistController.userArtistList);
// Crate Artist in Specific Muster Usere______________________________________
router.post('/', artistController.userCreateNewArtist);

module.exports = router;