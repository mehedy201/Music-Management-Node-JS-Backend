const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");

module.exports.storedNewBankInfo = async (req, res, next) => {
    try {
        const db = getDb();
        const bankInfo = req.body;
        const result = await db.collection('bank-info').insertOne(bankInfo);
        res.send({status: 200, message: 'Successfully Stored Bank Information', data: result});
    } catch (error) {
        next(error)
    }
}

module.exports.getStoredBankInfo = async (req, res, next) => {
    try {
        const db = getDb();
        const masterUserId = req.params.masterUserId;
        const findBankInfoByMasterUserId = await db.collection('bank-info').find({ masterUserId: masterUserId }).toArray();
        res.send({status: 200, message: 'Successfully Stored Bank Information', data: findBankInfoByMasterUserId});
    } catch (error) {
        next(error)
    }
}