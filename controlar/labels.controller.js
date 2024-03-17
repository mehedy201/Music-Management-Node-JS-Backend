const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");
const { deleteAwsStorageFile } = require("../utilities/aws-multer-storage");


// Create a New Labels___________________________________________________
module.exports.userCreateNewLabels = async (req, res, next) => {
    try {
        const db = getDb();
        const labels = req.body;
        const result = await db.collection('labels').insertOne(labels);
        res.send({status: 200, message: 'Successfully Create a labels', data: result});
    } catch (error) {
        next(error)
    }
}

// Get Labels data under the Master User by Status_________________________________
module.exports.userLabelsList = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Labels under Master User ______
        const masterUserId = req.params.masterUserId;
        const findLablesByMasterId = await db.collection('labels').find({ masterUserId: masterUserId }).toArray();
        // Filter Labels data by Status _______
        const status = req.query.status;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        // Condition ___________________________
        let organizeData;
        if(status === 'All'){
            organizeData = findLablesByMasterId.reverse()
        }else{
            const findByStatus = findLablesByMasterId.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            organizeData = findByStatus.reverse();
        }

        const dataCount = organizeData.length;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get labels List', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}
// Search Labels data under the Master User_________________________________
module.exports.userLabelsSearch = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Labels under Master User ______
        const masterUserId = req.params.masterUserId;
        const findLablesByMasterId = await db.collection('labels').find({ masterUserId: masterUserId }).toArray();
        // Filter Labels data by Status _______
        const status = req.query.status;
        // Filter Labels by labelsName_________
        const searchText = req.query.search;
        let data;
        if(status === 'All'){
            const findByName = findLablesByMasterId.filter(d =>d.labelName.toLowerCase().includes(searchText.toLowerCase()))
            data = findByName.reverse();
        }else{
            const findByStatus = findLablesByMasterId.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            const findByName = findByStatus.filter(d =>d.labelName.toLowerCase().includes(searchText.toLowerCase()));
            data = findByName.reverse();
        }
        const dataCount = data.length;
        res.send({status: 200, message: 'Successfully Get labels List by Search', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Single Labels Data _____________________________________________________________________________________
module.exports.singleLabelsData = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const findSingleLabels = await db.collection('labels').find({_id: new ObjectId(id) }).toArray();
        res.send({status: 200, message: 'Successfully Get single Labels Data', data: findSingleLabels});
    } catch (error) {
        next(error)
    }
}

// Search Labels data under the Master User_________________________________
module.exports.userLabelsListForCreateRelease = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Artist under Master User ___________
        const masterUserId = req.params.masterUserId;
        const status = "Approved"
        const data = await db.collection('labels').find({ masterUserId: masterUserId }).toArray();
        const find = data.filter(d => d.status.toLowerCase().includes(status.toLowerCase()))
        const organizeData = find.reverse();
        const dataCount = organizeData.length;
        res.send({status: 200, message: 'Successfully Get Labels List', data: organizeData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}


// Delete Labels Data and Image_____________________________________________
module.exports.deleteLabelsDataAndImage = async (req, res, next) => {
    try {
        // Delete Artist Img from AWS S3 ________________
        const imgKey = req.query.imgKey
        const deleteImg = await deleteAwsStorageFile(imgKey);
        //Delete Artist Data from MongoDB________________
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('labels').deleteOne(query);
        res.json({ status: 200, message: 'Deleted labels'});
    } catch (error) {
        next(error)
    }
}

// Upload Labels Image___________________________________________________
module.exports.uploadLabelsImg = async (req, res, next) => {
    try {
        const key = req.file.key;
        const imgUrl = req.file.location;
        const imgInfo = {key, imgUrl}
        res.json({ status: 200, message: 'Image uploaded successfully', data: imgInfo });
    } catch (error) {
        next(error)
    }
}