const express = require('express');
const bankDetailsController = require('../../controlar/bankDetails.controller');
const router = express.Router();

router.post('/', bankDetailsController.storedNewBankInfo);
router.get('/:masterUserId', bankDetailsController.getStoredBankInfo);
router.put('/:id', bankDetailsController.updateBankInfo);
router.delete('/:id', bankDetailsController.deleteBankInformation);

module.exports = router;