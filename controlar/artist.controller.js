const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");

// Get All Artist in Master User_________________________________________
module.exports.userArtistList = async (req, res, next) => {
    try {
        const db = getDb();
        const masterUserId = req.params.masterUserId;
        const result = await db.collection('artist').find({ masterUserId: masterUserId }).toArray();
        res.send({status: 200, message: 'Successfully Get artist List', data: result});
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
        res.send({status: 200, message: 'Successfully Create a Artist', data: result});
    } catch (error) {
        next(error)
    }
}

// Upload Profile Image
module.exports.uploadArtistImg = async (req, res, next) => {
    try {
        console.log(req.file);
        const key = req.file.key;
        const imgUrl = req.file.location;
        const imgInfo = {key, imgUrl}
        res.json({ status: 200, message: 'Image uploaded successfully', data: imgInfo });

    } catch (error) {
        next(error)
    }
}