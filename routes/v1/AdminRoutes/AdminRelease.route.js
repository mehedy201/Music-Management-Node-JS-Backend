const express = require('express');
const router = express.Router();
const AdminReleaseController = require('../../../controlar/AdminController/AdminRelease.controller')

router.get('/', AdminReleaseController.releasesList);




module.exports = router;