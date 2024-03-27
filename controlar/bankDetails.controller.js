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

module.exports.updateBankInfo = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const filter = { _id: new ObjectId(id)};
        const option = {upsert: true};
        const newObject = req.body;
        delete newObject._id;
        const result = await db.collection('bank-info').updateOne(filter, {$set: newObject}, option);
        res.send({status: 200, message: 'Successfully Update Labels Information', data: result});

    } catch (error) {
        next(error)
    }
}


module.exports.deleteBankInformation = async (req, res, next) => {
    try {
        //Delete Artist Data from MongoDB________________
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('bank-info').deleteOne(query);
        res.json({ status: 200, message: 'Deleted Bank info'});
    } catch (error) {
        next(error)
    }
}