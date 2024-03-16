const express = require('express');
const router = express.Router();
const adminLanguageController = require('../../../controlar/AdminController/AdminLanguage.controller')


router.post('/add-language', adminLanguageController.addLanguage);
router.get('/', adminLanguageController.getAllLanguage);
router.delete('/:id', adminLanguageController.deleteLanguage);



module.exports = router;