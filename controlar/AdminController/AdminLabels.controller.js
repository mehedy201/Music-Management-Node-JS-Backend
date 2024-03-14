const { getDb } = require("../../utilities/dbConnect");


// Get All Labels data by Status_________________________________
module.exports.usersLabelsList = async (req, res, next) => {
    try {
        const db = getDb();
        const query ={};
        const allLables = await db.collection('labels').find(query).toArray();
        // Filter Labels data by Status _______
        const status = req.query.status;
        const findByStatus = allLables.filter(d =>d.status.toLowerCase().includes(status.toLowerCase()));
        const organizeData = findByStatus.reverse();
        const dataCount = organizeData.length;
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get labels List', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}