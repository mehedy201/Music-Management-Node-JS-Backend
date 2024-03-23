const { ObjectId } = require("mongodb");
const { getDb } = require("../../utilities/dbConnect");

// Get All Artist data _________________________________
module.exports.usersArtistList = async (req, res, next) => {
    try {
        const db = getDb();
        const query ={};
        const AllArtist = await db.collection('artist').find(query).toArray();
        const organizeData = AllArtist.reverse();
        // Pagination __________________________
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        // Condition ___________________________
        const dataCount = organizeData.length;
        const data = organizeData.slice(startIndex, endIndex);
        res.send({status: 200, message: 'Successfully Get labels List', data: data, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}

// Search artist data_________________________________
module.exports.artistListBySearch = async (req, res, next) => {
    try {
        const db = getDb();
        // Fint Artist under Master User ___________
        const query = {};
        const searchText = req.query.search;
        const find = await db.collection('artist').find(query).toArray();
        const organizeData = find.reverse();
        // Search Data By User______________________
        const searchData = organizeData.filter(d =>d.artistName.toLowerCase().includes(searchText.toLowerCase()));
        const dataCount = searchData.length;
        res.send({status: 200, message: 'Successfully Get artist List', data: searchData, dataCount: dataCount});
    } catch (error) {
        next(error)
    }
}