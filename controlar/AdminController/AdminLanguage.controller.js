const { getDb } = require("../../utilities/dbConnect");

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