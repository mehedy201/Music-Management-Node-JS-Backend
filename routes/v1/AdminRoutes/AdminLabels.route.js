const express = require('express');
const router = express.Router();
const AdminLabelsController = require('../../../controlar/AdminController/AdminLabels.controller')


// Get All Labels By Status______________________________
router.get('/', AdminLabelsController.usersLabelsList);

// Get single Labels _____________________________________
router.get('/single/:id', AdminLabelsController.singleLabelForUpdateStatus);



module.exports = router;