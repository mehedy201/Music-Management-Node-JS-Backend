const { getDb } = require("../../utilities/dbConnect");
const { ObjectId } = require("mongodb");

module.exports.addGenre = async (req, res, next) => {
    try {
        const db = getDb();
        const genre = req.body;
        const result = await db.collection('genre').insertOne(genre);
        res.send({status: 200, message: 'Successfully add Genre!', data: result});
    } catch (error) {
        next(error)
    }
}

module.exports.getAllGenre = async (req, res, next) => {
    try {
        const db = getDb();
        const query ={};
        const genre = await db.collection('genre').find(query).toArray();
        const organizeData = genre.reverse();
        const dataCount = organizeData.length;
        res.send({status: 200, message: 'Successfully Get All Genre!', data: organizeData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

module.exports.deleteGenre = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const deleteGenre = await db.collection('genre').deleteOne(query);
        res.json({ status: 200, message: 'Deleted Genre'});
    } catch (error) {
        next(error)
    }
}