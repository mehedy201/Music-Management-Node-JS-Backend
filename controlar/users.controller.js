const { ObjectId } = require("mongodb");
const { getDb } = require("../utilities/dbConnect");

// Get All User Data
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const query ={};
        const db = getDb();
        const cursor = await db.collection('users').find(query);
        const users = await cursor.toArray();
        res.send({status: 200, message: 'Successfully Get All USERS', data: users});
    } catch (error) {
        next(error)
    }
}

// Get Single User Data using Id
module.exports.getSingleUser = async (req, res, next) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const singleData = await db.collection('users').findOne(query);
        res.send({status: 200, message: 'Successfully Get Single USERS Data', data: singleData});
    } catch (error) {
        next(error)
    }
}

// Create a New USER
module.exports.createNewUser = async (req, res, next) => {
    try {
        const db = getDb();
        const user = req.body;
        const userEmail = req.body.email
        const result = await db.collection('users').insertOne(user);
        res.send({status: 200, message: 'Successfully Create a New User', email: userEmail, data: result});
    } catch (error) {
        next(error)
    }
}

// Update User Information
module.exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const db = getDb();
        const filter = { _id: new ObjectId(id)};
        const option = {upsert: true};
        const newObject = req.body;
        const result = await db.collection('users').updateOne(filter, {$set: newObject}, option);
        res.send({status: 200, message: 'Successfully Get Single USERS Data', data: result});

    } catch (error) {
        next(error)
    }
}

