const express = require('express');
const artistController = require('../../controlar/artist.controller');
const { uploadArtistImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();

// Get All Artist in Specific Muster Usere____________________________________
router.get('/:masterUserId', artistController.userArtistList);
// Get All Artist in Specific Muster Usere____________________________________
router.get('/for-release/:masterUserId', artistController.userArtistListForCreateRelease);
// Get All Artist Data Using Search from Client Side__________________________
router.get('/search/:masterUserId', artistController.userArtistListBySearch);
// Crate Artist inside Specific Muster Usere______________________________________
router.post('/upload-artist-img', uploadArtistImage.single('file'), artistController.uploadArtistImg);
// Crate Artist in Specific Muster Usere______________________________________
router.post('/create-artist', artistController.userCreateNewArtist);

// Delete Artist Data and Artist Image_______________________________________
router.delete('/delete-artist/:id', artistController.deleteArtistDataAndImage);

module.exports = router;