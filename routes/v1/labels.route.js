const express = require('express');
const labelsController = require('../../controlar/labels.controller')
const { uploadLabelImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();

// Get Labels in Specific Muster Usere by Status______________________________
router.get('/:masterUserId', labelsController.userLabelsList);

// Get Single Labels Data______________________________
router.get('/single-labels/:id', labelsController.singleLabelsData);

// Get All Labels Data Using Search from Client Side__________________________
router.get('/search/:masterUserId', labelsController.userLabelsSearch);

// Get All Approved Label for Create release _________________________________
router.get('/for-release/:masterUserId', labelsController.userLabelsListForCreateRelease);

// Get All Approved Label for Create release _________________________________
router.get('/action-required/:masterUserId', labelsController.lablesActionRequired);

// Crate Labels inside Specific Muster Usere______________________________________
router.post('/upload-labels-img', uploadLabelImage.single('file'), labelsController.uploadLabelsImg);

// Crate Labels in Specific Muster Usere______________________________________
router.post('/create-labels', labelsController.userCreateNewLabels);
// UPDATE Label informations__________________________________________________
router.put('/update-labels/:id', labelsController.updateLabels);

// Delete Labels Data and Labels Image_______________________________________
router.delete('/delete-labels/:id', labelsController.deleteLabelsDataAndImage);

module.exports = router;