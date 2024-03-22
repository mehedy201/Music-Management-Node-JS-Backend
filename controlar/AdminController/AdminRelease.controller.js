// const { ObjectId } = require("mongodb");
const { getDb } = require("../../utilities/dbConnect");
// const { deleteAwsStorageFile } = require("../utilities/aws-multer-storage");


// Get Release data By Status________________________________________________________________
module.exports.releasesList = async (req, res, next) => {
    try {
        const db = getDb();
        const query = {}
        const allRelease = await db.collection('release').find(query).toArray();
        // Filter Release data by Status _______
        const status = req.query.status;
        let organizeData;
        let dataCount;
        if(status === 'All'){
            organizeData = allRelease.reverse();
            dataCount = organizeData.length;
        }else{
            const findByStatus = allRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
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
module.exports.releaseSearchByTitle = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Release under Master User ______
        const query = {};
        const allRelease = await db.collection('release').find(query).toArray();
        const status = req.query.status;
        const searchText = req.query.search;
        let data;
        if(status === 'All'){
            const findByTitle = allRelease.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()));
            data = findByTitle.reverse();
        }else{
            const findByStatus = allRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            const findByTitle = findByStatus.filter(d =>d.releaseTitle.toLowerCase().includes(searchText.toLowerCase()));
            data = findByTitle.reverse();
        }
        const dataCount = data.length;
        res.send({status: 200, message: 'Successfully Get Release List by Search', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

module.exports.releaseSearchByUpc = async (req, res, next) => {
    try {
        const db = getDb();
        // Find Release under Master User ______
        const query = {};
        const allRelease = await db.collection('release').find(query).toArray();
        const status = req.query.status;
        const searchText = req.query.search;
        let data;
        if(status === 'All'){
            const findByTitle = allRelease.filter(d =>d?.UPC.toLowerCase().includes(searchText.toLowerCase()));
            data = findByTitle.reverse();
        }else{
            const findByStatus = allRelease.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            const findByTitle = findByStatus.filter(d =>d?.UPC.toLowerCase().includes(searchText.toLowerCase()));
            data = findByTitle.reverse();
        }
        const dataCount = data.length;
        res.send({status: 200, message: 'Successfully Get Release List by Search', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}