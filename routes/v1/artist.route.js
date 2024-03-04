const express = require('express');
const artistController = require('../../controlar/artist.controller');
const { uploadArtistImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();

// Get All Artist in Specific Muster Usere____________________________________
router.get('/:masterUserId', artistController.userArtistList);
// Crate Artist inside Specific Muster Usere______________________________________
router.post('/upload-artist-img', uploadArtistImage.single('file'), artistController.uploadArtistImg);
// Crate Artist in Specific Muster Usere______________________________________
router.post('/create-artist', artistController.userCreateNewArtist);

module.exports = router;