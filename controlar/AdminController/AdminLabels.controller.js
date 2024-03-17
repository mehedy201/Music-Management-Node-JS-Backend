const { ObjectId } = require("mongodb");
const { getDb } = require("../../utilities/dbConnect");


// Get All Labels data by Status_________________________________
module.exports.usersLabelsList = async (req, res, next) => {
    try {
        const db = getDb();
        const query ={};
        const allLables = await db.collection('labels').find(query).toArray();
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
            organizeData = allLables.reverse()
        }else{
            const findByStatus = allLables.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            organizeData = findByStatus.reverse();
        }
        const dataCount = organizeData.length;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get labels List', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Get Single Labels data _________________________________
module.exports.singleLabelForUpdateStatus = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const findSingleLabels = await db.collection('labels').find({_id: new ObjectId(id) }).toArray();
        res.send({status: 200, message: 'Successfully Get single labels Data', data: findSingleLabels});
    } catch (error) {
        next(error)
    }
}

// Update Labels Status_____________________________________
module.exports.updateLabelsStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const db = getDb();
        const filter = { _id: new ObjectId(id)};
        const option = {upsert: true};
        const newObject = req.body;
        delete newObject._id;
        console.log(newObject);
        const result = await db.collection('labels').updateOne(filter, {$set: newObject}, option);
        res.send({status: 200, message: 'Successfully Update Labels Status', data: result});

    } catch (error) {
        next(error)
    }
}

// Search Labels data _________________________________
module.exports.labelsSearch = async (req, res, next) => {
    try {
        const db = getDb();
        const query ={};
        const allLables = await db.collection('labels').find(query).toArray();
        // Filter Labels data by Status _______
        const status = req.query.status;
        // Filter Labels by labelsName_________
        const searchText = req.query.search;
        let data;
        if(status === 'All'){
            const searchData = allLables.filter(d =>d.labelName.toLowerCase().includes(searchText.toLowerCase()))
            data = searchData.reverse();
        }else{
            const findByStatus = allLables.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
            const searchData = findByStatus.filter(d =>d.labelName.toLowerCase().includes(searchText.toLowerCase()))
            data = searchData.reverse();
        }
        // Filter Labels by labelsName_________
        const dataCount = data.length;
        res.send({status: 200, message: 'Successfully Get labels List by Search', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}