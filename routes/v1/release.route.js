const express = require('express');
const releaseController = require('../../controlar/release.controller');
const { uploadReleaseImage, uploadReleaseAudio } = require('../../utilities/aws-multer-storage');
const router = express.Router();


// Release Image Upload API______________________________________
router.post('/upload-release-img', uploadReleaseImage.single('file'), releaseController.uploadReleaseImg);
// Release Audio Upload API
router.post('/upload-release-audio', uploadReleaseAudio.single('file'), releaseController.uploadReleaseAudio);



module.exports = router;


