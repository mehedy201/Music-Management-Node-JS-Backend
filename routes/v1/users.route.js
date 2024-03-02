const express = require('express');
const usersController = require('../../controlar/users.controller');
const { uploadUserProfileImage } = require('../../utilities/aws-multer-storage');
const router = express.Router();


// Create a new user using Email______________________________
router.post('/', usersController.createNewUser);
// Get All user Data__________________________________________
router.get('/', usersController.getAllUsers);
// Get single User Data_______________________________________
router.get('/:id', usersController.getSingleUser);
// Update Single User Data____________________________________
router.put('/:id', usersController.updateUser);

router.post('/upload-profile-img', uploadUserProfileImage.single('file'), usersController.uploadProfileImg);



module.exports = router;

