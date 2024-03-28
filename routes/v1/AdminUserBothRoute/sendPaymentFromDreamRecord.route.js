const express = require('express');
const sendPaymentFromDreamRecord = require('../../../controlar/AdminUserBothController/sendPaymentFromDreamRecord.controller');
const router = express.Router();

//Payment
router.post('/', sendPaymentFromDreamRecord.storedPaymentDetails);
router.get('/:masterUserId', sendPaymentFromDreamRecord.getPaymentDetails);
router.get('/search/:masterUserId', sendPaymentFromDreamRecord.searchPaymentDetailsByYear);
//Withdrawal
router.post('/withdrawal/', sendPaymentFromDreamRecord.storedWithdrawalDetails);
router.get('/withdrawal/:masterUserId', sendPaymentFromDreamRecord.getWithdrawalDetails);
router.get('/withdrawal/search/:masterUserId', sendPaymentFromDreamRecord.searchWithdrawalDetailsByYear);

// Only For Admin Route ________________________________________________________________________________
router.get('/admin/withdrawal/req-list', sendPaymentFromDreamRecord.withdrawalReqList);
router.get('/admin/withdrawal/search-req-list', sendPaymentFromDreamRecord.getSingleWithdrawalDetailsBySearch);
router.get('/admin/withdrawal/single/:id', sendPaymentFromDreamRecord.singleWithdrawalData);
router.put('/admin/withdrawal/single/:id', sendPaymentFromDreamRecord.updateWithdrawalStatus);
router.delete('/admin/withdrawal/single/:id', sendPaymentFromDreamRecord.withdrawalDataDeleted);


module.exports = router;