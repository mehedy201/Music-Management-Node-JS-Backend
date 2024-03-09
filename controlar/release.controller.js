

// Upload Artist Image___________________________________________________
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
// Upload Artist Image___________________________________________________
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