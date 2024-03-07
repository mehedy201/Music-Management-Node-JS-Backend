const express = require('express');
const labelsController = require('../../controlar/labels.controller')
const { uploadLabelImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();

// Get All Labels in Specific Muster Usere____________________________________
router.get('/:masterUserId', labelsController.userLabelsList);

// Get All Labels Data Using Search from Client Side__________________________
// router.get('/search/:masterUserId', Labels Controller.userLabels ListBySearch);

// Crate Artist inside Specific Muster Usere______________________________________
router.post('/upload-labels-img', uploadLabelImage.single('file'), labelsController.uploadLabelsImg);

// Crate Artist in Specific Muster Usere______________________________________
router.post('/create-labels', labelsController.userCreateNewLabels);

// Delete Artist Data and Artist Image_______________________________________
// router.delete('/delete-artist/:id', artistController.deleteArtistDataAndImage);

module.exports = router;