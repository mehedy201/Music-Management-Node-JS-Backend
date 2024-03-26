const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleware Start_________________________________
app.use(cors());
app.use(express.json());
// middleware End___________________________________


// DB Import & MongoDB Connected______________________________________________________
const dbConnection = require('./utilities/dbConnect');
dbConnection.connectToServer();


// Admin Dashboard All Routes_________________________________________________________
const adminUsersListRoute = require('./routes/v1/AdminRoutes/UsersLIstForAdmin.route')
const adminReleasRoutes = require('./routes/v1/AdminRoutes/AdminRelease.route');
const adminLabelsRoutes = require('./routes/v1/AdminRoutes/AdminLabels.route');
const adminArtistRoutes = require('./routes/v1/AdminRoutes/AdminArtist.route');
// admin settings page api routes ________
const adminSettingsLanguageRoutes = require('./routes/v1/AdminRoutes/AdminLanguage.route');
const adminSettingsGenreRoutes = require('./routes/v1/AdminRoutes/AdminGenre.route');


// User Dashboard All Routes__________________________________________________________
const userRoutes = require('./routes/v1/users.route');
const releaseRoutes = require('./routes/v1/release.route');
const artistRoutes = require('./routes/v1/artist.route');
const labelsRoutes = require('./routes/v1/labels.route');
const bankInformationRoutes = require('./routes/v1/bankDetails.route');

// Common_____________________________________________________________________________
const sendPayments = require('./routes/v1/AdminUserBothRoute/sendPaymentFromDreamRecord.route');

// Common API_______________________________________________/////
app.use('/common/api/v1/payment', sendPayments);


// USERS API________________________________________________/////
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/release', releaseRoutes);
app.use('/api/v1/artist', artistRoutes);
app.use('/api/v1/labels', labelsRoutes);
app.use('/api/v1/bank-info', bankInformationRoutes);

// ADMIN API________________________________________________/////
app.use('/admin/api/v1/users', adminUsersListRoute);
app.use('/admin/api/v1/release', adminReleasRoutes);
app.use('/admin/api/v1/labels', adminLabelsRoutes);
app.use('/admin/api/v1/artist', adminArtistRoutes);

// admin settings page api ________________________
app.use('/admin/api/v1/language', adminSettingsLanguageRoutes);
app.use('/admin/api/v1/genre', adminSettingsGenreRoutes);







// Backend Bottom Part ____________________
app.get('/', (req, res) => {
    res.send('Backend Running');
});
app.all('*', (req, res) => {
    res.send('No Routes Found')
})
app.listen(port, () => {
    console.log('Backend Console', port);
});
