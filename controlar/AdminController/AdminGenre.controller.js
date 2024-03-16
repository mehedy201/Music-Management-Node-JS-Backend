const { getDb } = require("../../utilities/dbConnect");

module.exports.addGenre = async (req, res, next) => {
    try {
        console.log('hit');
        const db = getDb();
        const genre = req.body;
        const result = await db.collection('genre').insertOne(genre);
        res.send({status: 200, message: 'Successfully add Genre!', data: result});
    } catch (error) {
        next(error)
    }
}