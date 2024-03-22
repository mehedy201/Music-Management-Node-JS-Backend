const express = require('express');
const router = express.Router();
const UsersListForAdmin = require('../../../controlar/AdminController/UsersListForAdmin.controller')

// Get All user Data__________________________________________
router.get('/', UsersListForAdmin.getAllUsers);
// Get single User Data_______________________________________
router.get('/:id', UsersListForAdmin.getSingleUser);



module.exports = router;