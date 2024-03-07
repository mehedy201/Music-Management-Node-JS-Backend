const express = require('express');
const labelsController = require('../../controlar/labels.controller')
const { uploadLabelImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();

// Get All Labels in Specific Muster Usere____________________________________
router.get('/:masterUserId', labelsController.userLabelsList);

// Get All Labels Data Using Search from Client Side__________________________
router.get('/search/:masterUserId', labelsController.userLabelsSearch);

// Crate Artist inside Specific Muster Usere______________________________________
router.post('/upload-labels-img', uploadLabelImage.single('file'), labelsController.uploadLabelsImg);

// Crate Artist in Specific Muster Usere______________________________________
router.post('/create-labels', labelsController.userCreateNewLabels);

// Delete Artist Data and Labels Image_______________________________________
router.delete('/delete-labels/:id', labelsController.deleteLabelsDataAndImage);

module.exports = router;