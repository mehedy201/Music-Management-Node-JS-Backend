const express = require('express');
const router = express.Router();
const AdminReleaseController = require('../../../controlar/AdminController/AdminRelease.controller')

router.get('/', AdminReleaseController.releasesList);
router.get('/search-by-title/', AdminReleaseController.releaseSearchByTitle);
router.get('/search-by-upc/', AdminReleaseController.releaseSearchByUpc);




module.exports = router;