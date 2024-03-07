const express = require('express');
const releaseController = require('../../controlar/release.controller');
const { uploadReleaseImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();


// Release Image Upload API______________________________________
router.post('/upload-release-img', uploadReleaseImage.single('file'), releaseController.uploadReleaseImg);



module.exports = router;


