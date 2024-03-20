const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");
const { deleteAwsStorageFile } = require("../utilities/aws-multer-storage");


// Create a New Artist___________________________________________________
module.exports.userCreateNewArtist = async (req, res, next) => {
    try {
        const db = getDb();
        const artist = req.body;
        const result = await db.collection('artist').insertOne(artist);
        res.send({status: 200, message: 'Successfully Create a Artist', data: result});
    } catch (error) {
        next(error)
    }
}

// Update Artist Information_____________________________________________
module.exports.updateArtist = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const filter = { _id: new ObjectId(id)};
        const option = {upsert: true};
        const newObject = req.body;
        delete newObject._id;
        const result = await db.collection('artist').updateOne(filter, {$set: newObject}, option);
        res.send({status: 200, message: 'Successfully Update Artist Information', data: result});

    } catch (error) {
        next(error)
    }
}

// Upload Artist Image___________________________________________________
module.exports.uploadArtistImg = async (req, res, next) => {
    try {
        const key = req.file.key;
        const imgUrl = req.file.location;
        const imgInfo = {key, imgUrl}
        res.json({ status: 200, message: 'Image uploaded successfully', data: imgInfo });
    } catch (error) {
        next(error)
    }
}

// All Artist data under the Master User_________________________________
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

// Search artist data under the Master User_________________________________
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

// Search artist data under the Master User_________________________________
module.exports.userArtistListForCreateRelease = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Artist under Master User ___________
        const masterUserId = req.params.masterUserId;
        const find = await db.collection('artist').find({ masterUserId: masterUserId }).toArray();
        const organizeData = find.reverse();
        const dataCount = organizeData.length;
        res.send({status: 200, message: 'Successfully Get artist List', data: organizeData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Single Artist Data _____________________________________________________________________________________
module.exports.singleArtistData = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const findSingleArtist = await db.collection('artist').find({_id: new ObjectId(id) }).toArray();
        res.send({status: 200, message: 'Successfully Get single Artist Data', data: findSingleArtist});
    } catch (error) {
        next(error)
    }
}

// Delete Artist Data and Image_____________________________________________
module.exports.deleteArtistDataAndImage = async (req, res, next) => {
    try {
        // Delete Artist Img from AWS S3 ________________
        const imgKey = req.query.imgKey
        const deleteImg = await deleteAwsStorageFile(imgKey);
        //Delete Artist Data from MongoDB________________
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('artist').deleteOne(query);
        res.json({ status: 200, message: 'Deleted Artist'});
    } catch (error) {
        next(error)
    }
}