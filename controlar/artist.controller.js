const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");

// All artist data under the Master User_________________________________
module.exports.userArtistList = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Artist under Master User ______
        const masterUserId = req.params.masterUserId;
        const find = await db.collection('artist').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        const dataCount = organizeData.length;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get artist List', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}
// All artist data under the Master User_________________________________
module.exports.userArtistListBySearch = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Artist under Master User ___________
        const masterUserId = req.params.masterUserId;
        const searchText = req.query.search;
        const find = await db.collection('artist').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        // Search Data By User______________________
        const searchData = organizeData.filter(d =>d.artistName.toLowerCase().includes(searchText.toLowerCase()));
        const dataCount = searchData.length;
        res.send({status: 200, message: 'Successfully Get artist List', data: searchData, dataCount: dataCount});
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