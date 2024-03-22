const { ObjectId } = require("mongodb");
const { getDb } = require("../../utilities/dbConnect");

// Get All User Data
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const query ={};
        const db = getDb();
        const cursor = await db.collection('users').find(query);
        const users = await cursor.toArray();
        const organizeData = users.reverse();
        const dataCount = organizeData.length;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get Release List', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}
// Get Single USER
module.exports.getSingleUser = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('users').findOne(query);
        res.send({status: 200, message: 'Successfully Get Single USERS Data', data: singleData});
    } catch (error) {
        next(error)
    }
}