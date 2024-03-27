const { getDb } = require("../../utilities/dbConnect");

// Stored Payment Details___________________________________________________
module.exports.storedPaymentDetails = async (req, res, next) => {
    try {
        const db = getDb();
        const paymentDetails = req.body;
        const result = await db.collection('stored-pay-details').insertOne(paymentDetails);
        res.send({status: 200, message: 'Successfully Stored Payment Information', data: result});
    } catch (error) {
        next(error)
    }
}

// Get payment details data under the User_________________________________
module.exports.getPaymentDetails = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Payment Details under User ______
        const masterUserId = req.params.id;
        const find = await db.collection('stored-pay-details').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        const dataCount = organizeData.length;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get Payment Details', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Search Payment Details by Year_________________________________
module.exports.searchPaymentDetailsByYear = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Payment Details under User ___________
        const masterUserId = req.params.id;
        const searchText = req.query.search;
        const find = await db.collection('stored-pay-details').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        // Search Data By Year______________________
        const searchData = organizeData.filter(d => d.year == searchText);
        const dataCount = searchData.length;
        res.send({status: 200, message: 'Successfully Search Payment Details By Year', data: searchData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}


// __________________________________________________________________________________________________________________
// __________________________________________________________________________________________________________________
// Stored Withdrawal Details___________________________________________________
module.exports.storedWithdrawalDetails = async (req, res, next) => {
    try {
        const db = getDb();
        const withdrawalDetails = req.body;
        delete withdrawalDetails._id;
        const result = await db.collection('stored-withdrawal-details').insertOne(withdrawalDetails);
        res.send({status: 200, message: 'Successfully Stored Withdrawal Information', data: result});
    } catch (error) {
        next(error)
    }
}