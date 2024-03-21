const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");
const { deleteAwsStorageFile } = require("../utilities/aws-multer-storage");

// Upload Release Image__________________________________________________________________________________________
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
// Upload Release Audio___________________________________________________________________________________________
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

// Create a New Release__________________________________________________________________________________________
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

// Update Release_________________________________________________________________________________________________
module.exports.updateRelease = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const filter = { _id: new ObjectId(id)};
        const option = {upsert: true};
        const newObject = req.body;
        delete newObject._id
        const result = await db.collection('release').updateOne(filter, {$set: newObject}, option);
        res.send({status: 200, message: 'Successfully Update Release Data', data: result});

    } catch (error) {
        next(error)
    }
}

// Get Release data under the Master User By Status________________________________________________________________
module.exports.userReleasesList = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Release under Master User ______
        const masterUserId = req.params.masterUserId;
        const findReleaseByMasterId = await db.collection('release').find({ masterUserId: masterUserId }).toArray();
        // Filter Release data by Status _______
        const status = req.query.status;
        let organizeData;
        let dataCount;
        if(status === 'All'){
            organizeData = findReleaseByMasterId.reverse();
            dataCount = organizeData.length;
        }else{
            const findByStatus = findReleaseByMasterId.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            organizeData = findByStatus.reverse();
            dataCount = organizeData.length;
        }
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

// Release Search ________________________________________________________________________________________________
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

// Single Release Data _______________________________________________________________________________________________
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

// Delete Release with Image_____________________________________________
module.exports.deleteReleaseDataAndImage = async (req, res, next) => {
    try {
        // Delete Artist Img from AWS S3 ________________
        const imgKey = req.query.imgKey
        const deleteImg = await deleteAwsStorageFile(imgKey);
        const audioKey = req.query.audioKey;
        const deleteAudio = await deleteAwsStorageFile(audioKey);
        //Delete Artist Data from MongoDB________________
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('release').deleteOne(query);
        res.json({ status: 200, message: 'Deleted Release'});
    } catch (error) {
        next(error)
    }
}

// _____________________________________________________________________________________________________________________
// Get Release data under the Artist By Status__________________________________________________________________________
module.exports.artistReleasesList = async (req, res, next) => {
    try {
        const db = getDb();
        const artistId = req.params.id;
        const query ={};
        // Find Release under Artist ___________
        const allData = await db.collection('release').find(query).toArray();
        const allArtistRelease = allData.filter(item => item.artist.some(artist => artist._id === artistId));

        const status = req.query.status;
        let organizeData;
        let dataCount;
        if(status === 'All'){
            organizeData = allArtistRelease.reverse();
            dataCount = organizeData.length;
        }else{
            const findByStatus = allArtistRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            organizeData = findByStatus.reverse();
            dataCount = organizeData.length;
        }
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        // Filter Release data Count _______
        const totalCount = allArtistRelease.length;

        res.send({status: 200, message: 'Successfully Get Release List', data: data, dataCount: dataCount, totalCount: totalCount});
    } catch (error) {
        next(error)
    }
}

// Release Search Under Artist_____________________________________________________________________________________
module.exports.artistPageReleaseSearch = async (req, res, next) => {
    try {
        const db = getDb();
        const query = {};
        // Find Release under Master User ______
        const artistId = req.params.id;
        // Find Release under Artist ___________
        const allData = await db.collection('release').find(query).toArray();
        const allArtistRelease = allData.filter(item => item.artist.some(artist => artist._id === artistId));
        // Filter release by release title______
        const searchText = req.query.search;
        const status = req.query.status;
        let data;
        if(status === 'All'){
            const findByTitle = allArtistRelease.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()))
            data = findByTitle.reverse();
        }else{
            const findByStatus = allArtistRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            const findByTitle = findByStatus.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()));
            data = findByTitle.reverse();
        }
        const dataCount = data.length;
        const totalCount = allArtistRelease.length

        res.send({status: 200, message: 'Successfully Get Release List by Search in Artist Page', data: data, dataCount: dataCount, totalCount: totalCount});
    } catch (error) {
        next(error)
    }
}
// _____________________________________________________________________________________________________________________

// _____________________________________________________________________________________________________________________
// Get Release data under the Labels By Status__________________________________________________________________________
module.exports.labelsReleasesList = async (req, res, next) => {
    try {
        const db = getDb();
        const lebelId = req.params.id;
        const query ={};
        // Find Release under Labels ___________
        const allData = await db.collection('release').find(query).toArray();
        const allLabelsRelease = allData.filter(item => item.labels.some(label => label._id === lebelId));
        const status = req.query.status;
        let organizeData;
        let dataCount;
        if(status === 'All'){
            organizeData = allLabelsRelease.reverse();
            dataCount = organizeData.length;
        }else{
            const findByStatus = allLabelsRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            organizeData = findByStatus.reverse();
            dataCount = organizeData.length;
        }
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        // Filter Release data Count _______
        const totalCount = allLabelsRelease.length;
        res.send({status: 200, message: 'Successfully Get Labels Release List', data: data, dataCount: dataCount, totalCount: totalCount});
    } catch (error) {
        next(error)
    }
}

// Release Search Under Labels_____________________________________________________________________________________
module.exports.labelsPageReleaseSearch = async (req, res, next) => {
    try {
        const db = getDb();
        const query = {};
        const labelId = req.params.id;
        // Find Release under Labels ___________
        const allData = await db.collection('release').find(query).toArray();
        const allLabelsRelease = allData.filter(item => item.labels.some(label => label._id === labelId));
        // Filter Release by Release Title______
        const searchText = req.query.search;
        const status = req.query.status;
        let data;
        if(status === 'All'){
            const findByTitle = allLabelsRelease.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()))
            data = findByTitle.reverse();
        }else{
            const findByStatus = allLabelsRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            const findByTitle = findByStatus.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()));
            data = findByTitle.reverse();
        }
        const dataCount = data.length;
        const totalCount = allLabelsRelease.length

        res.send({status: 200, message: 'Successfully Get Release List by Search in Labels Page', data: data, dataCount: dataCount, totalCount: totalCount});
    } catch (error) {
        next(error)
    }
}
// _____________________________________________________________________________________________________________________

// Delete Release File__________________________________________________________________________________________________
module.exports.deleteFile = async (req, res, next) => {
    try {
        // Delete Release Audio from AWS S3 ________________
        const key = req.query.key
        const deleteImg = await deleteAwsStorageFile(key);
        res.json({ status: 200, message: 'Successfully Deleted'});
    } catch (error) {
        next(error)
    }
}