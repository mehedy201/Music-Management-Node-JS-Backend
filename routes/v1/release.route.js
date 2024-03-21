const express = require('express');
const releaseController = require('../../controlar/release.controller');
const { uploadReleaseImage, uploadReleaseAudio } = require('../../utilities/aws-multer-storage');
const router = express.Router();


// Release Image Upload API_________________________________________________________
router.post('/upload-release-img', uploadReleaseImage.single('file'), releaseController.uploadReleaseImg);
// Release Audio Upload API_________________________________________________________
router.post('/upload-release-audio', uploadReleaseAudio.single('file'), releaseController.uploadReleaseAudio);
// Release Data Store in mongoDB API________________________________________________
router.post('/create-release', releaseController.userCreateNewRelease);
// Delete Release Audio_____________________________________________________________
router.delete('/delete-file', releaseController.deleteFile);
// Delete Release Audio_____________________________________________________________
router.delete('/delete-release/:id', releaseController.deleteReleaseDataAndImage);
// Get Release data in Specific Muster User by status_______________________________
router.get('/:masterUserId', releaseController.userReleasesList);
// Get All Release Data Using Search from Client Side_______________________________
router.get('/search/:masterUserId', releaseController.userReleaseSearch);
// _________________________________________________________________________________
// Get Release data in Specific Artist by status____________________________________
router.get('/artist/:id', releaseController.artistReleasesList);
// Get All Release Data Using Search from Client Artist_____________________________
router.get('/artist/search/:id', releaseController.artistPageReleaseSearch);
// Get Release data in Specific Labels by status____________________________________
router.get('/labels/:id', releaseController.labelsReleasesList);
// Get All Release Data Using Search from Client Labels_____________________________
router.get('/labels/search/:id', releaseController.labelsPageReleaseSearch);
// _________________________________________________________________________________
// Get Single Release Data _________________________________________________________
router.get('/single/:id', releaseController.singleReleaseData);
// Get Single Release Data _________________________________________________________
router.put('/update-release/:id', releaseController.updateRelease);

module.exports = router;


