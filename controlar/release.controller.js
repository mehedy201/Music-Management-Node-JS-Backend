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
// Upload Release Image___________________________________________________
module.exports.uploadReleaseAudio = async (req, res, next) => {
    try {
        const key = req.file.key;
        const audioName = req.file.originalname;
        const audioUrl = req.file.location;
        const audioInfo = {key, audioName, audioUrl}
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