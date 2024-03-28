const { ObjectId } = require("mongodb");
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
        const masterUserId = req.params.masterUserId;
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
        const masterUserId = req.params.masterUserId;
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

// Only For Admin API  Start_____________________________________________________________________________
// Get All Withdrawal Request____________________________________________________________________________
module.exports.withdrawalReqList = async (req, res, next) => {
    try {
        const query ={};
        const db = getDb();
        const find = await db.collection('stored-withdrawal-details').find(query).toArray();
        const status = req.query.status;
        let organizeData;
        if(status === 'All'){
            organizeData = find.reverse()
        }else{
            const findByStatus = find.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            organizeData = findByStatus.reverse();
        }
        const dataCount = organizeData.length;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Sucessfull get All withdrawal Details', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}
// Withdrawal Search By ID
module.exports.getSingleWithdrawalDetailsBySearch = async (req, res, next) => {
    try {
        const query ={};
        const db = getDb();
        const find = await db.collection('stored-withdrawal-details').find(query).toArray();
        const status = req.query.status;
        // Filter Labels by labelsName_________
        const searchText = req.query.search;
        console.log(status);
        let data;
        if(status === 'All'){
            if(searchText){
                const findById = find.filter(d =>d._id == searchText)
                data = findById.reverse();
            }else{
                data = find.reverse();
            }
        }else{
            if(searchText){
                const findByStatus = find.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
                const findById = findByStatus.filter(d =>d._id == searchText);
                data = findById.reverse();
            }else{
                const findByStatus = find.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
                data = findByStatus.reverse();
            }
        }
        const dataCount = data.length;
        res.send({status: 200, message: 'Successfully Get labels List by Search', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Single Withdrawal Data _____________________________________________________________________________________
module.exports.singleWithdrawalData = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const findSingleWithdrawalData = await db.collection('stored-withdrawal-details').find({_id: new ObjectId(id) }).toArray();
        res.send({status: 200, message: 'Successfully Get withdrawal Data', data: findSingleWithdrawalData});
    } catch (error) {
        next(error)
    }
}

module.exports.updateWithdrawalStatus = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const filter = { _id: new ObjectId(id)};
        const option = {upsert: true};
        const newObject = req.body;
        delete newObject._id;
        const result = await db.collection('stored-withdrawal-details').updateOne(filter, {$set: newObject}, option);
        res.send({status: 200, message: 'Successfully Update Withdrawal Status', data: result});

    } catch (error) {
        next(error)
    }
}

module.exports.withdrawalDataDeleted = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('stored-withdrawal-details').deleteOne(query);
        res.json({ status: 200, message: 'Deleted withdrawal Data'});
    } catch (error) {
        next(error)
    }
}


// Only For Admin API  End_____________________________________________________________________________
// ____________________________________________________________________________________________________


// Get Withdrawal details data under the User_________________________________
module.exports.getWithdrawalDetails = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Payment Details under User ______
        const masterUserId = req.params.masterUserId;
        const find = await db.collection('stored-withdrawal-details').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        const dataCount = organizeData.length;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Sucessfull get withdrawal Details under The user', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Search Withdrawal Details by Year_________________________________
module.exports.searchWithdrawalDetailsByYear = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Payment Details under User ___________
        const masterUserId = req.params.masterUserId;
        const searchText = req.query.search;
        const find = await db.collection('stored-withdrawal-details').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        // Search Data By Year______________________
        const searchData = organizeData.filter(d => d.withdrawalYear == searchText);
        const dataCount = searchData.length;
        res.send({status: 200, message: 'Successfully Search withdrawal Details By Year', data: searchData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}