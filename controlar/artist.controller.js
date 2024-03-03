// Get All User Data
module.exports.userArtistList = (req, res, next) => {
    try {
        console.log('Hit');
        res.send({status: 200, message: 'Successfully artist Connected'});
    } catch (error) {
        next(error)
    }
}