const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");

// Get All User Data_____________________________________________________
module.exports.userArtistList = (req, res, next) => {
    try {
        console.log('Hit');
        res.send({status: 200, message: 'Successfully artist Connected'});
    } catch (error) {
        next(error)
    }
}

// Create a New Artist___________________________________________________
module.exports.userCreateNewArtist = async (req, res, next) => {
    try {
        const db = getDb();
        const user = req.body;
        const result = await db.collection('artist').insertOne(user);
        res.send({status: 200, message: 'Successfully Create a Artist', email: userEmail, data: result});
    } catch (error) {
        next(error)
    }
}