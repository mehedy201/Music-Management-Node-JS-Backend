const express = require('express');
const usersController = require('../../controlar/users.controller');
const router = express.Router();


// Create a new user using Email
router.post('/', usersController.createNewUser);
// Get All user Data
router.get('/', usersController.getAllUsers);
// Get single User Data
router.get('/:id', usersController.getSingleUser);
// Update Single User Data
router.put('/:id', usersController.updateUser);

module.exports = router;

