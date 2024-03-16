const express = require('express');
const releaseController = require('../../controlar/release.controller');
const { uploadReleaseImage, uploadReleaseAudio } = require('../../utilities/aws-multer-storage');
const router = express.Router();


// Release Image Upload API______________________________________
router.post('/upload-release-img', uploadReleaseImage.single('file'), releaseController.uploadReleaseImg);
// Release Audio Upload API
router.post('/upload-release-audio', uploadReleaseAudio.single('file'), releaseController.uploadReleaseAudio);
// Release Data Store in mongoDB API
router.post('/create-release', releaseController.userCreateNewRelease);
// Delete Release Audio______
router.delete('/delete-release-audio', releaseController.deleteReleaseAudio);
// Get Release data in Specific Muster User by status____________________________________
router.get('/:masterUserId', releaseController.userReleasesList);
// Get All Release Data Using Search from Client Side__________________________
router.get('/search/:masterUserId', releaseController.userReleaseSearch);

// Get Single Release Data __________________________
router.get('/single/:id', releaseController.singleReleaseData);
// Get Single Release Data __________________________
router.put('/update-release/:id', releaseController.updateRelease);



module.exports = router;


