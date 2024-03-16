const { getDb } = require("../../utilities/dbConnect");
const { ObjectId } = require("mongodb");

module.exports.addLanguage = async (req, res, next) => {
    try {
        console.log('hit');
        const db = getDb();
        const language = req.body;
        const result = await db.collection('language').insertOne(language);
        res.send({status: 200, message: 'Successfully add Language!', data: result});
    } catch (error) {
        next(error)
    }
}


module.exports.getAllLanguage = async (req, res, next) => {
    try {
        const db = getDb();
        const query ={};
        const languages = await db.collection('language').find(query).toArray();
        const organizeData = languages.reverse();
        const dataCount = organizeData.length;
        res.send({status: 200, message: 'Successfully Get All Language!', data: organizeData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

module.exports.deleteLanguage = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const deleteLanguage = await db.collection('language').deleteOne(query);
        res.json({ status: 200, message: 'Deleted Language'});
    } catch (error) {
        next(error)
    }
}