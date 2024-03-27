const express = require('express');
const sendPaymentFromDreamRecord = require('../../../controlar/AdminUserBothController/sendPaymentFromDreamRecord.controller');
const router = express.Router();


router.post('/', sendPaymentFromDreamRecord.storedPaymentDetails);
router.get('/:masterUserId', sendPaymentFromDreamRecord.getPaymentDetails);
router.get('/search/:masterUserId', sendPaymentFromDreamRecord.searchPaymentDetailsByYear);

router.post('/withdrawal/', sendPaymentFromDreamRecord.storedWithdrawalDetails);
router.get('/withdrawal/:masterUserId', sendPaymentFromDreamRecord.getWithdrawalDetails);
router.get('/withdrawal/search/:masterUserId', sendPaymentFromDreamRecord.searchWithdrawalDetailsByYear);

// Only For Admin Route _________________________________________________________________________________

router.get('/admin/withdrawal/req-list', sendPaymentFromDreamRecord.withdrawalReqList);
router.get('/admin/withdrawal/search-req-list', sendPaymentFromDreamRecord.getSingleWithdrawalDetailsBySearch);


module.exports = router;