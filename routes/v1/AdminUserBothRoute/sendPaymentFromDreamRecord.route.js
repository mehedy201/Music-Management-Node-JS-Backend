const express = require('express');
const sendPaymentFromDreamRecord = require('../../../controlar/AdminUserBothController/sendPaymentFromDreamRecord.controller');
const router = express.Router();


router.post('/', sendPaymentFromDreamRecord.storedPaymentDetails);
router.get('/:id', sendPaymentFromDreamRecord.getPaymentDetails);
router.get('/search/:id', sendPaymentFromDreamRecord.searchPaymentDetailsByYear);

module.exports = router;