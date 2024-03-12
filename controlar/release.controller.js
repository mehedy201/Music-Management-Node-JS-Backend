const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");
const { deleteAwsStorageFile } = require("../utilities/aws-multer-storage");

// Upload Release Image___________________________________________________
module.exports.uploadReleaseImg = async (req, res, next) => {
    try {
        const key = req.file.key;
        const imgUrl = req.file.location;
        const imgInfo = {key, imgUrl}
        res.json({ status: 200, message: 'Image uploaded successfully', data: imgInfo });
    } catch (error) {
        next(error)
    }
}
// Upload Release Audio___________________________________________________
module.exports.uploadReleaseAudio = async (req, res, next) => {
    try {
        const audioKey = req.file.key;
        const audioName = req.file.originalname;
        const audioUrl = req.file.location;
        const audioInfo = {audioKey, audioName, audioUrl}
        res.json({ status: 200, message: 'Audio uploaded successfully', data: audioInfo });
    } catch (error) {
        next(error)
    }
}

// Create a New Release___________________________________________________
module.exports.userCreateNewRelease = async (req, res, next) => {
    try {
        const db = getDb();
        const release = req.body;
        const result = await db.collection('release').insertOne(release);
        res.send({status: 200, message: 'Successfully Create Release', data: result});
    } catch (error) {
        next(error)
    }
}


// Get Release data under the Master User By Status_________________________________
module.exports.userReleasesList = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Release under Master User ______
        const masterUserId = req.params.masterUserId;
        const findReleaseByMasterId = await db.collection('release').find({ masterUserId: masterUserId }).toArray();
        // Filter Release data by Status _______
        const status = req.query.status;
        const findByStatus = findReleaseByMasterId.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
        const organizeData = findByStatus.reverse();
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

// Release Search _____________________________________________________________________________________
module.exports.userReleaseSearch = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Release under Master User ______
        const masterUserId = req.params.masterUserId;
        const findReleaseByMasterId = await db.collection('release').find({ masterUserId: masterUserId }).toArray();
        // Filter Release data by Status _______
        const status = req.query.status;
        const findByStatus = findReleaseByMasterId.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
        // Filter Release by Release Title_________
        const searchText = req.query.search;
        const findByTitle = findByStatus.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()))
        const data = findByTitle.reverse();
        const dataCount = data.length;

        res.send({status: 200, message: 'Successfully Get Release List by Search', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Single Release Data _____________________________________________________________________________________
module.exports.singleReleaseData = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const findSingleRelease = await db.collection('release').find({_id: new ObjectId(id) }).toArray();
        res.send({status: 200, message: 'Successfully Get single Release Data', data: findSingleRelease});
    } catch (error) {
        next(error)
    }
}






// Delete Release Audio_____________________________________________
module.exports.deleteReleaseAudio = async (req, res, next) => {
    try {
        // Delete Release Audio from AWS S3 ________________
        const audioKey = req.query.audioKey
        const deleteImg = await deleteAwsStorageFile(audioKey);
        res.json({ status: 200, message: 'Deleted Release Audio'});
    } catch (error) {
        next(error)
    }
}