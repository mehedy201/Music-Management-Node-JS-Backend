const express = require('express');
const labelsController = require('../../controlar/labels.controller')
const { uploadLabelImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();

// Get All Artist in Specific Muster Usere____________________________________
// router.get('/:masterUserId', artistController.userArtistList);

// Get All Artist Data Using Search from Client Side__________________________
// router.get('/search/:masterUserId', artistController.userArtistListBySearch);

// Crate Artist inside Specific Muster Usere______________________________________
router.post('/upload-labels-img', uploadLabelImage.single('file'), labelsController.uploadLabelsImg);

// Crate Artist in Specific Muster Usere______________________________________
// router.post('/create-artist', artistController.userCreateNewArtist);

// Delete Artist Data and Artist Image_______________________________________
// router.delete('/delete-artist/:id', artistController.deleteArtistDataAndImage);

module.exports = router;